/**
 * Copyright (c) 2011-2012 Douglas Cau <douglas@cau.se>
 *
 * This work is licenced under the MIT license. Please see LICENSE for details.
 */

/**
 * Message:
 *
 * @param {Object} client: API client object.
 * @param {Map} data: Phone number parameters.
 */
var Message = function(elk, data) {
  this.id       = data.id;
  this.from     = data.from;
  this.to       = data.to;
  this.message  = data.message;
  this.created  = data.created;
	
  this.client = client;
};

module.exports = Message;
