# node-elk

Node.js library to interact with 46elks messaging service.

## Requirement

* Account at 46elks.com

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

var operator = new Elk({
  username  : "USER",
  password  : "PASS"
});
```

## License

Copyright 2011-2012 (c) Douglas Cau. This work is licensed under the MIT license. Please see LICENSE for details.
