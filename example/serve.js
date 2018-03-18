const HTTP = require('http');

const staticServer = require('node-static');

const fileServer = new staticServer.Server();

HTTP.createServer(function(req, res) {
    req.addListener(`end`, function() {
        fileServer.serve(req, res);
    }).resume();
}).listen(1357);
