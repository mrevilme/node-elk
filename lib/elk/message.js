var Message = function(elk, data) {
  this.id       = data.id;
  this.from     = data.from;
  this.to       = data.to;
  this.body     = data.body;
  this.created  = data.created;
	
  this.elk = elk;
};

exports.Message = Message;
