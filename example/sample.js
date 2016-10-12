var http = require('http');
var api  = require('../');

var custom = {
  '/memory_usage': function(body, callback) {
    callback(null, process.memoryUsage());
  },
  '/uptime': function(body, callback) {
    callback(null, {uptime:process.uptime()}); },
  '/versions': function(body, callback) {
    callback(null, process.versions);
  },
  '/error': function(body, callback) {
    // do something
    if (body.method == 'POST') {
      console.log(body.data);
      callback(401, {"error":"unauthorized","error_description":"Invalid parameter."});
    }
  }
};

var server = http.createServer(api.apiHandler(custom));

server.listen(9000, function() {
  console.log('ok');
});

