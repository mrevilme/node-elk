/**
 * Copyright (c) 2011-2012 Douglas Cau <douglas@cau.se>
 *
 * This work is licensed under the MIT license. Please see LICENSE for details.
 */

/* Internal modules. */

var Message = require("./message").Message;
var Call = require("./call").Call;

/**
 * Phone:
 *
 * @param {Object} client: API client object.
 * @param {Map} data: Phone number parameters.
 */
var Phone = function(client, data) {
  this.id = data.id;
  this.country = data.country;
  this.active = (data.active == "yes");
  this.number = data.number;
  this.sms_url = data.sms_url;
  this.voice_start = data.voice_start;
  this.capabilities = data.capabilities;
  
  this.client = client;
};

module.exports = Phone;

/**
 * update: Saves the current state of the phone number to the server.
 *
 * @param {Function} callback: Callback function with the response.
 */
Phone.prototype.update = function(callback) {
  var options = {
    sms_url : this.sms_url,
    voice_start : this.voice_start,
  };
  
  if (!this.active)
    options.active = this.active ? "yes" : "no";
  
  this.client.post("/Numbers/" + this.id, options, callback);
};

/**
 * delete: Disables the phone number from further actions.
 *
 * @param {Function} callback: Callback function with the response.
 */
Phone.prototype.delete = function(callback) {
  this.client.post("/Numbers/" + this.id, {active : "no"}, callback);
};

/**
 * sms: Sends a text message to a give phone number.
 *
 * @param {String} to: Phone number of the recipient.
 * @param {String} text: The message.
 * @param {Function} callback: Callback function with the response.
 */
Phone.prototype.sms = function(to, text, callback) {
  this._message(to, text, "SMS", callback);
};

/**
 * call: Dails a given phone number.
 *
 * @param {String} to: Phone number of the recipient.
 * @param {Function} callback: Callback function with the response.
 */
Phone.prototype.call = function(to, callback) {
  var data = {
    from : this.number,
    to : to,
    voice_start : this.voice_start
  };

  this.client.post("/Calls", data, function(error, response) {
    if (callback instanceof Function) {
      if (response) {
        var call = new Call(this.client, response);

        call.phone = this;
      }

      callback(error, call);
    }
  }.bind(this));
};

/**
 * _message: Private helper to abstract different message types (such as SMS/MMS).
 */
Phone.prototype._message = function(to, message, type, callback) {
  var data = {
    from : this.number,
    to : to,
    message : message
  };
	
  this.client.post("/" + type, data, function(error, response) {
    if (callback instanceof Function) {
      if (response) {
        var message = new Message(this.elk, response);
      }
      
      callback(error, message);
    }
  }.bind(this));
};