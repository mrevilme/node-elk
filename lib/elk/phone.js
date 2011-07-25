var Message = require("./message").Message;

var Phone = function(elk, data) {
  this.id             = data.id;
  this.country        = data.country;
  this.active         = data.active;
  this.number         = data.number;
  this.hook           = data.url;
  this.capabilities   = data.capabilities;
	
  this.path           = "/number/" + this.id; 
  this.elk            = elk;
};

Phone.prototype.message = function(from, to, text, type, callback) {
  this.post("/" + type, { message : { from : from, to : to, body : text } }, callback);
};

Phone.prototype.sms = function(from, to, text, callback) {
  this.message(from, to, text, "sms", callback);
};

exports.Phone = Phone;