# node-status-api
This is based on @you21979's [node-status-api](https://github.com/you21979/node-status-api).

## Installation
```sh
$ npm install https://github.com/soonsebii/node-status-api.git
```

## Example
Server side.
```js
var http = require('http');
var restful = require('node-status-api');

var custom = {
  '/memory_usage': function(u, callback) {
    callback(null, process.memoryUsage());
  },
  '/uptime': function(u, callback) {
    callback(null, {uptime:process.uptime()});
  },
  '/versions': function(u, callback) {
    callback(null, process.versions);
  },
  '/error': function(m, u, callback) {
    // do something
    if (m == 'GET') {
      callback(500);
    }
  }
};

var server = http.createServer(restful.apiHandler(custom));

server.listen(9000, function() {
  console.log('ok');
});
```

Client side.
```js
$.ajax({
  url: 'http://localhost:9000/uptime',
  dataType: 'json',
  type: 'GET',
  success: function(data) {
    alert('running time : ' + data.uptime);
  }
});
```

## License
MIT
