# node-elk

Node.js library to interact with 46elks messaging service.

## Usage

First, include and create an instance with your username and password.

	var Elk = require("./lib/elk").Elk;

	var instance = new Elk({
  	  username  : "USER",
  	  password  : "PASS"
	});
	
This is how you would allocate a new phone number and save the id to a defined variable *pid*.

	instance.alloc({ country : "se", hook : "#" }, function(error, phone) {
  	  pid = phone.id;
	});
	
Once you have a phone identified by *pid*, sending a text message is easy.

	instance.phone(pid, function(error, phone) {
  	  phone.sms("+46701234567", "Test");
	});
	
## License

Copyright 2011 (c) Douglas Cau.
Please see LICENSE for details.