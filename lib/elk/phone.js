var Message = require("./message").Message;

var Phone = function(elk, data) {
  this.id       = data.id;
  this.country  = data.country;
  this.active   = data.active;
  this.number   = data.number;
  this.hook     = data.url;
	
  this.path     = "/number/" + this.id; 
  this.elk      = elk;
};

exports.Phone = Phone;