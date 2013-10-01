var http = require('http');

var s = http.createServer(function(req, res) {
	res.writeHead(200, { 'content-type':'text/plain'});
	res.write("hello ");
	//setTimeout(function() {
		res.end("world\n");
	//}, 2000);
});
	
s.listen(80);
	
//curl http://localhost:8000
