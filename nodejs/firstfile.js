var http = require('http');
var fs = require('fs');
var mysql=require('mysql');

// var url=require('url');
http.createServer(function (req, res) {
	// var q = url.parse(req.url, true);
 //  var filename = "." + q.pathname;
 //  console.log(filename);
  fs.readFile("index.html", function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080); 