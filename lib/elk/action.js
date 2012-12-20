/**
 * Copyright (c) 2011-2012 Douglas Cau <douglas@cau.se>
 *
 * This work is licensed under the MIT license. Please see LICENSE for details.
 */

/**
 * Action: 
 */
var Action = function() {
  var actions = {};
};

module.exports = Action;

/**
 * dail: 
 */
Action.prototype.dail = function(data) {
  var next = {
    connect: data.number
  };

  for (var property in ['busy', 'failed', 'success']) {
    if (data[property])
      next[property] = data[property];
  }

  this._next(next);
  return this;
};

/**
 * hangup: 
 */
Action.prototype.hangup = function(data) {
  this._next({
    hangup : (data ? data : "reject")
  });

  return this;
};

/**
 * ivr: 
 */
Action.prototype.ivr = function(data) {
  var next = {};

  this._next(next);
  return this;
};

/**
 * play: 
 */
Action.prototype.play = function(data) {
  var next = {
    play: data.resource
  };

  if (data.failed)
    next.failed = data.failed;

  this._next(next);
  return this;
};

/**
 * record: 
 */
Action.prototype.record = function(data) {
  var next = {
    record : data.resource
  };

  if (data.failed)
    next.failed = data.failed;

  this._next(next);
  return this;
};

/**
 * _next:
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