/**
 * Copyright (c) 2011-2012 Douglas Cau <douglas@cau.se>
 *
 * This work is licensed under the MIT license. Please see LICENSE for details.
 */

/* External modules. */

var util = require("util"),
    eventemitter = require("events").EventEmitter;

/* Internal modules. */

var Call = require("./elk/call"),
	Client = require("./client"),
    Message = require("./elk/message"),
    Phone = require("./elk/phone");

/**
 * Elk: 
 * 
 * @param {Map} options: Client and server options.
 */
var Elk = function(options) {
  var options = options || {};

  this.client = new Client(options);
  
  if (this.listen = options.listen) {
    var Express = require("express");
    
    this.express = options.express || Express.createServer(
      Express.logger(),
      Express.bodyParser()
    );
  
    this.express.listen(this.listen.port || 3000);
    this.express.post((this.listen.path || "/elk") + "/:type", function(request, response) {
      if (request.params.type.toLowerCase() == "sms") {
        this.emit("sms", new Message(this, request.body), response);
      } else if (request.params.type.toLowerCase() == "call") {
        this.emit("call", new Call(this, request.body), response);
      }
    }.bind(this));
  }
  
  eventemitter.call(this);
};

util.inherits(Elk, eventemitter);
module.exports = Elk;

/**
 * newPhone: Allocates a new phone number.
 *
 * @param {Map} options: Phone number options. 
 */
Elk.prototype.newPhone = function(options, callback) {
  this.cleint.post("/Numbers", options, function(error, response) {
    if (response) {
      var phone = new Phone(this.client, response);
    }
    
    callback(error, phone);
  });
};

/**
 * getPhone: Retrieves an existing phone number.
 *
 * @param {String} id: Phone number ID.
 * @param {Function} callback: Response callback function with the new phone.
 */
Elk.prototype.getPhone = function(id, callback) {
  this.client.get("/Numbers/" + id, function(error, response) {
    if (response) {
      var phone = new Phone(this.client, response);
    }
    
    callback(error, phone);
  }.bind(this));
};

/**
 * getPhones: Retrieves a list of all phone numbers (both active and inactive).
 *
 * @param {Function} callback: Respons callback function with a map of phones.
 */
Elk.prototype.getPhones = function(callback) {
  this.client.get("/Numbers", function(error, response) {
    if (response) {
      var phones = response.data.map(function(phone) {
        return new Phone(this.client, phone);
      }, this);
    }
    
    callback(error, phones);
  }.bind(this));
};