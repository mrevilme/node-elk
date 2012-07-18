var Message = function(elk, data) {
  this.id       = data.id;
  this.from     = data.from;
  this.to       = data.to;
  this.message  = data.message;
  this.created  = data.created;
	
  this.elk = elk;
};


exports.Message = Message;
