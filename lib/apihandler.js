var http = require('http');
var url  = require('url');

var apiHandler = function(api) {
  return function(req, res) {
    var _makeResponse = function(res, status, data) {
      // header
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
      res.setHeader('Content-Type', 'application/json;charset=UTF-8');

      // status
      if (!status)
        status = 200;
      res.statusCode = status;
      res.statusMessage = http.STATUS_CODES[status];

      // data
      if (data)
        res.write(JSON.stringify(data));        
    };

    var callback = function(status, data) {
      _makeResponse(res, status, data); 
      return res.end();
    };

    var uri = (url.parse(req.url)).pathname;
    var method   = req.method;
    var resource = api[uri];
    var message  = [];
    
    req.on('data', function(chunk) {
      message.push(chunk);
    });

    req.on('end', function() {
      // to process a preflight request.
      if (method == 'OPTIONS') {
        _makeResponse(res);
        return res.end();
      }

      var body    = { };
      body.method = method;
      body.data   = Buffer.concat(message).toString();

      if (resource) {
        resource(body, callback);
      } else {
        _makeResponse(res, 404);
        return res.end();
      }
    });
  };
};

module.exports = apiHandler;
