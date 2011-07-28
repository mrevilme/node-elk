var Message = require('./elk/message').Message,
    Phone = require('./elk/phone').Phone,
    QueryString = require('querystring');

var Elk = function(options) {
  var options = options || {};

  if (!options.username) { throw new Error("Please provide a username."); }
  if (!options.password) { throw new Error("Please provide a password."); }

  this.http = require("https");
  this.host = options.host ? options.host : "api.46elks.com";
  this.port = options.port ? options.port : 443;
  this.path = options.path ? options.path : "/a1";
  this.auth = "Basic " + new Buffer(options.username + ":" + options.password).toString("base64");
};

Elk.prototype.alloc = function(data, callback) {
  var options = {
    country       : data.country,
    sms_url       : data.sms_url,
    voice_start   : data.voice_start
  };
  
  this.post("/Numbers", options, function(error, response) {
    if (response) {
      var phone = new Phone(this, response);
    }
    
    callback(error, phone);
  });
};

Elk.prototype.get = function(path, callback) {
  this.request("GET", path, null, callback);
};

Elk.prototype.phone = function(id, callback) {
  this.get("/Numbers/" + id, function(error, response) {
    if (response) {
      var phone = new Phone(this, response);
    }
    
    callback(error, phone);
  }.bind(this));
};

Elk.prototype.phones = function(callback) {
  this.get("/Numbers", function(error, response) {
    if (response) {
      var phones = response.numbers.map(function(phone) {
        return new Phone(this, phone);
      }, this);
    }
    
    callback(error, phones);
  }.bind(this));
};

Elk.prototype.post = function(path, body, callback) {
  this.request("POST", path, body, callback);
};

Elk.prototype.request = function(method, path, body, callback) {
  var headers = {
    "Authorization" : this.auth,
    "Host"          : this.host,
    "Content-Type"  : "application/json"
  };

  if (method == "POST" || method == "DELETE") {
    if (typeof(body) != "string") {
      body = QueryString.stringify(body);
    }

    headers["Content-Length"] = body.length;
  }

  var options = {
    host    : this.host,
    port    : this.port,
    method  : method,
    path    : this.path + path,
    headers : headers
  };

  var request = this.http.request(options, function(response) {
    if (callback instanceof Function) {
      var data = "";

      response.on("data", function(chunk) {
        data += chunk;
      });
      response.on("end", function() {
        if (response.statusCode != 200) {
          return callback(new Error("Server error: " + data));
        }

        try {
          data = JSON.parse(data);
        } catch(e) {
          return callback(new Error("Invalid JSON response."));
        }

        callback(null, data);
      });
    }
  });

  if (method == "POST") {
    request.write(body);
  }

  request.end();
};

exports.Elk = Elk;