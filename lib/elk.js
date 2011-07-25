var Elk = function(options) {
  var options = options || {};

  this.authorization = "Basic " + new Buffer(options.user)

  if (!options.user)   { throw new Error("Please provide a username."); }
  if (!options.password) { throw new Error("Please provide a password."); }

  this.http           = require("https");
  this.host           = options.domain ? options.domain : "api.46elks.com";
  this.port           = options.port ? options.port : 443;
  this.path           = options.path ? options.path : "/a1";
  this.authorization  = "Basic " + new Buffer(options.user + ":" + options.password).toString("base64");
};

Elk.prototype.delete = function(path, callback) {
  this.request("DELETE", path, "", callback);
};

Elk.prototype.get = function(path, callback) {
  this.request("GET", path, null, callback);
};

Elk.prototype.post = function(path, body, callback) {
  this.request("POST", path, body, callback);
};

Elk.prototype.request = function(method, path, body, callback) {
  var headers = {
    "Authorization" : this.authorization,
    "Host"          : this.domain,
    "Content-Type"  : "application/json"
  };

  if (method == "POST" || method == "DELETE") {
    if (typeof(body) != "string") {
      body = JSON.stringify(body);
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