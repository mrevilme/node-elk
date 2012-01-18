var Call = function(elk, data) {
  this.id         = data.callid;
  this.from       = data.from;
  this.to         = data.to;
  this.direction  = data.direction;
  this.phone      = data.phone;
  this.result     = data.result;
	
  this.elk = elk;
};

Call.prototype.dail = function(callback) {
  var options = {
    to : this.to,
    from : this.from,
    voice_start : this.phone.voice_start
  };
  
  this.post("/Calls", options, function(error, response) {
    if (callback instanceof Function) {
      if (response) {
        var call = new Call(this.elk, response);
        
        call.phone = this.phone;
      }
      
      callback(error, call);
    }
  }.bind(this));
};

Call.prototype.get = function(path, callback) {
  this.elk.get(path, callback);
};

Call.prototype.post = function(path, body, callback) {
  this.elk.post(path, body, callback);
}

exports.Call = Call;
