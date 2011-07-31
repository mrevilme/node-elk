var Call = function(elk, data) {
  this.id         = data.callid;
  this.from       = data.from;
  this.to         = data.to;
  this.direction  = data.direction;
  this.result     = data.result;
	
  this.elk = elk;
};

exports.Call = Call;
