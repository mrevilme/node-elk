var Message = function(elk, data) {
  this.from   = data.from;
  this.to     = data.to;
  this.body   = data.body;
	
  this.elk    = elk;
};

exports.Message = Message;
