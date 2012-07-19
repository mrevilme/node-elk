/**
 * Copyright (c) 2011-2012 Douglas Cau <douglas@cau.se>
 *
 * This work is licenced under the MIT license. Please see LICENSE for details.
 */

/**
 * Call: 
 *
 * @param {Object} client: API client object.
 * @param {Map} data: Phone call parameters.
 */
var Call = function(client, data) {
  this.id         = data.callid;
  this.from       = data.from;
  this.to         = data.to;
  this.direction  = data.direction;
  this.phone      = data.phone;
  this.result     = data.result;
	
  this.client = client;
};

module.exports = Call;

/**
 * dail: Makes an outgoing call.
 * 
 * @param {Function} callback: Callback function with the response.
 */
Call.prototype.dail = function(callback) {
  var options = {
    to : this.to,
    from : this.from,
    voice_start : this.phone.voice_start
  };
  
  this.client.post("/Calls", options, function(error, response) {
    if (callback instanceof Function) {
      if (response) {
        var call = new Call(this.elk, response);
        
        call.phone = this.phone;
      }
      
      callback(error, call);
    }
  }.bind(this));
};