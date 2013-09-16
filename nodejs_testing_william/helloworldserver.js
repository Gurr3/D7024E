var http = require("http");

function say(word){
	console.log(word);
}

function execute( func, value){
	func(value);
}

http.createServer(onRequest).listen(8888);

function onRequest (request, response){
	console.write("Got request");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
}