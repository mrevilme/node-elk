var Message = require("./message").Message;

var Phone = function(elk, data) {
  this.id             = data.id;
  this.country        = data.country;
  this.active         = data.active;
  this.number         = data.number;
  this.hook           = data.sms_url;
  this.capabilities   = data.capabilities;
  
  this.elk = elk;
};

Phone.prototype.get = function(path, callback) {
  this.elk.get(path, callback);
};

Phone.prototype.message = function(to, text, type) {
  this.post("/" + type, { from : this.number, to : to, message : text }, function(error) {});
};

Phone.prototype.post = function(path, body, callback) {
  this.elk.post(path, body, callback);
}

Phone.prototype.sms = function(to, text) {
  this.message(to, text, "SMS");
};

exports.Phone = Phone;