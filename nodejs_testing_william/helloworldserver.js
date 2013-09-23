var http = require("http");

function say(word){
	console.log(word);
}

function execute( func, value){
	func(value);
}


if (!module.parent) {
  http.createServer(onRequest).listen(8888)//app.listen(8080);
  console.log('Port', 8888);
}
//http.createServer(onRequest).listen(8888);

function onRequest (request, response){
	console.log("Got request");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World!");
	response.end();
}