/**
 * Copyright (c) 2011-2013 Douglas Cau <douglas@cau.se>
 *
 * This work is licensed under the MIT license. Please see LICENSE for details.
 */

/**
 * Action:
 */
var Action = function() {

};

module.exports = Action;

/**
 * dail: Connect the call with another phone.
 *
 * @param {String} id: Phone number to dail.
 * @param {Map} error: Actions to take on error.
 */
Action.prototype.dail = function(number, error) {
  var next = {
    connect: number
  };

  if (error) {
    for (var property in ['busy', 'failed', 'success']) {
      if (error[property])
        next[property] = error[property];
    }
  }

  this._next(next);
  return this;
};

/**
 * hangup: Close down the wire.
 *
 * @param {String} reason: Reason can be either reject or busy.
 */
Action.prototype.hangup = function(reason) {
  this._next({
    hangup : (reason ? reason : "reject")
  });

  return this;
};

/**
 * ivr:
 */
Action.prototype.ivr = function(resource, options) {
  var next = {
    ivr : resource
  };

  if (options) {
    for (var property in ['digits', 'repeat', 'timeout']) {
      if (options[property])
        next[property] = options[property];
    }

    for (var property in options)
    {
      if (typeof options[property] == "number")
        next[property] = options[property];
    }
  }

  this._next(next);
  return this;
};

/**
 * callback: Continue with instructions retrieved by calling this URL.
 *
 * @param {String} resource: Resource to call for further actions.
 */
Action.prototype.callback = function(resource) {
  this._next(resource);

  return this;
};

/**
 * play: Play sound file or tone.
 *
 * @param {String} resource: URL or DTMF sound resource.
 * @param {Action} error: Optional action to take on failure.
 */
Action.prototype.play = function(resource, error) {
  var next = {
    play: resource
  };

  if (error)
    next.failed = error;

  this._next(next);
  return this;
};

/**
 * record: Record the conversation.
 *
 * @param {String} resource: URL callback for sound file.
 * @param {Action} error: Optional action to take on failure.
 */
Action.prototype.record = function(resource, error) {
  var next = {
    record : resource
  };

  if (error)
    next.failed = error;

  this._next(next);
  return this;
};

/**
 * _next: Private helper method to build event chain.
 */
Action.prototype._next = function(data) {
  for (var property in this) {
    if (typeof this[property] != "function") {
      var current = this;

      while (current.next) {
        current = current.next;
      }

      current.next = data;
      return;
    }
  }

  for (var property in data) {
    this[property] = data[property];
  }
};