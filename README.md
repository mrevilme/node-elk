# node-elk

Node.js library to interact with 46elks messaging service.

## Example

This short example shows how to allocate a phone number and send a message using the library.

	var Elk = require("./lib/elk").Elk;

	var instance = new Elk({
  	  username  : "USER",
  	  password  : "PASS"
	});

	var pid;

	instance.alloc({ country : "se", hook : "#" }, function(error, phone) {
  	  pid = phone.id;
	});

	instance.phone(pid, function(error, phone) {
  	  phone.sms("+46701234567", "Test");
	});
