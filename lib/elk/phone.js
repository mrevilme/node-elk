var Message = require("./message").Message;

var Phone = function(elk, data) {
  this.parameters(data);
  this.elk = elk;
};

Phone.prototype.alloc = function(callback) {
  this.post(this.path, {contry : this.country, sms_url : this.hook }, callback);
};

Phone.prototype.free = function(callback) {
  this.post(this.path, {active : "no"}, callback);
};

Phone.prototype.message = function(from, to, text, type, callback) {
  this.post("/" + type, { message : { from : from, to : to, body : text } }, callback);
};

Phone.prototype.parameters = function(data) {
  this.id             = data.id;
  this.country        = data.country;
  this.active         = data.active;
  this.number         = data.number;
  this.hook           = data.sms_url;
  this.capabilities   = data.capabilities;
  this.path           = "/numbers/" + this.id;
};

Phone.prototype.sms = function(from, to, text, callback) {
  this.message(from, to, text, "sms", callback);
};

exports.Phone = Phone;