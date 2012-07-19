/**
 * Copyright (c) 2011-2012 Douglas Cau <douglas@cau.se>
 *
 * This work is licenced under the MIT license. Please see LICENSE for details.
 */

/* External modules. */
var https = require("https"),
	querystring = require("querystring");

/**
 * Client: API client.
 *
 * @param {Map} data: Client parameters.
 */
var Client = function(data) {
  var data = data || {};
	
  if (!data.username) { throw new Error("Please provide a username."); }
  if (!data.password) { throw new Error("Please provide a password."); }

  this.http = https;
  this.host = data.host ? data.host : "api.46elks.com";
  this.port = data.port ? data.port : 443;
  this.path = data.path ? data.path : "/a1";
  this.auth = "Basic " + new Buffer(data.username + ":" + data.password).toString("base64");
};

module.exports = Client;

/**
 * get: Sends an HTTP GET request to the server.
 *
 * @param {String} path: Request URI.
 * @param {Function} callback: Callback function with the response.
 */
Client.prototype.get = function(path, callback) {
  this._request("GET", path, null, callback);
};

/**
 * post: Sends an HTTP POST request to the server.
 *
 * @param {String} path: Request URI.
 * @param {String} body: Request body.
 * @param {Function} callback: Callback function with the response.
 */
Client.prototype.post = function(path, body, callback) {
  this._request("POST", path, body, callback);
};

/**
 * request: Private helper which sends an HTTP request to the server.
 */
Client.prototype._request = function(method, path, body, callback) {
  var headers = {
    "Authorization" : this.auth,
    "Host"          : this.host,
    "Content-Type"  : "application/json"
  };

  if (method == "POST" || method == "DELETE") {
    if (typeof(body) != "string") {
      body = querystring.stringify(body);
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