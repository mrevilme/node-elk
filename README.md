# node-elk

Node.js library to interact with 46elks messaging service.

## Usage

First, install the npm package.

```
$ npm install elk
```

Then, include and create an instance with your username and password.

```javascript
var Elk = require("elk").Elk;

var instance = new Elk({
  username  : "USER",
  password  : "PASS"
});
```

This is how you would allocate a new phone number and save the id to a defined variable *pid*.

```javascript
instance.alloc({ country : "se", sms_url : "http://example.com/hook" }, function(error, phone) {
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

## License

Copyright 2011 (c) Douglas Cau. This work is licenced under the MIT license. Please see LICENSE for details.
