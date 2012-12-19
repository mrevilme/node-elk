/**
 * Copyright (c) 2011-2012 Douglas Cau <douglas@cau.se>
 *
 * This work is licensed under the MIT license. Please see LICENSE for details.
 */

/**
 * Call: 
 *
 * @param {Object} client: API client object.
 * @param {Map} data: Phone call parameters.
 */
var Call = function(client, data) {
  this.id = data.callid;
  this.from = data.from;
  this.to = data.to;
  this.direction = data.direction;
  this.phone = data.phone;
  this.result = data.result;
	
  this.client = client;
};

module.exports = Call;
