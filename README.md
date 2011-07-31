# node-elk

Node.js library to interact with 46elks messaging service.

## Requirement

* Account at 46elks.com
* Express module for incomming connections.

## Usage

First, install the npm elk package.

```
$ npm install elk
```

This will download all you need to get started in your ./node_modules/ folder.

### Outbound

In your project, include and create an instance with your username and password.

```javascript
var Elk = require("elk").Elk;

var instance = new Elk({
  username  : "USER",
  password  : "PASS"
});
```

This is how you would allocate a new phone number and save the id to a defined variable *pid*.

```javascript
var options = {
  country      : "se",
  sms_url      : "http://example.com/sms",
  voice_start  : "http://example.com/voice"
};

instance.alloc(options, function(error, phone) {
  pid = phone.id;
});
```

Once you have a phone identified by *pid*, sending a text message is easy.

```javascript
instance.phone(pid, function(error, phone) {
  phone.sms("+46701234567", "Test");
});
```

Curious of all your phone numbers? This will print them all with full details.

```javascript
instance.phones(function(error, phones){
  console.log(phones);
});
```

Finally, when you're all done it's time to deactivate the phone number.

```javascript
instance.phone(pid, function(error, phone) {
  phone.active = false;
  phone.save();
});
```

### Inbound

This library depends on the node.js Express module to handle incomming connections. Likely, you'll already have an instance running and that's fine, just add it to the options when creating the Elk instance. If you don't have, no worries, the Elk module will create one for you.

Creating a new instance.

```javascript
var Elk = require("elk").Elk;

var instance = new Elk({
  username  : "USER",
  password  : "PASS",

  listen : {
	port : process.env.PORT || 3000,
	path : "/app"
  }
});
```

Using an existing instance.

```javascript
var Elk = require("elk").Elk;

var instance = new Elk({
  username  : "USER",
  password  : "PASS",
  express   : ExpressInstance
});
```

Once the instance is up and running you can handle incoming messages with an event listener. The message variable is a Message object.

```javascript
instance.on("sms", function(message, response) {
  response.send("PONG");
});
```

Incoming calls are handled in the same manner, where the call variable is a Call object.

```javascript
instance.on("call", function(call, response) {
  response.send("reject");
});
```

## License

Copyright 2011 (c) Douglas Cau. This work is licenced under the MIT license. Please see LICENSE for details.
