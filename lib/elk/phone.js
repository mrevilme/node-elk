var Message = require("./message").Message;

var Phone = function(elk, data) {
  this.id             = data.id;
  this.country        = data.country;
  this.active         = data.active == "yes";
  this.number         = data.number;
  this.hook           = data.sms_url;
  this.capabilities   = data.capabilities;
  
  this.elk = elk;
};

Phone.prototype.get = function(path, callback) {
  this.elk.get(path, callback);
};

Phone.prototype.message = function(to, text, type, callback) {
  this.post("/" + type, { from : this.number, to : to, message : text }, function(error, response) {
    if (callback instanceof Function) {
      if (response) {
        var message = new Message(this.elk, response);
      }
      
      callback(error, message);
    }
  }.bind(this));
};

Phone.prototype.post = function(path, body, callback) {
  this.elk.post(path, body, callback);
}

Phone.prototype.save = function(callback) {
  this.elk.post("/Number/" + this.id, {sms_url : this.hook, active : this.active ? "yes" : "no"}, callback);
}

Phone.prototype.sms = function(to, text, callback) {
  this.message(to, text, "SMS", callback);
};

exports.Phone = Phone;