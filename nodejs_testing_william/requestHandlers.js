var exec = require("child_process").exec
var querystring = require("querystring"), 
	fs = require("fs"),
	formidable = require("formidable");
var imagename = 0;

function start(response) {
	console.log("Request handler 'start' was called");
	
	var body ='<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" '+
	'content="text/html; charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+
	'<input type="file" name="upload"  multiple="multiple">'+
	'<input type="submit" value="Upload file" />'+
	'</form>'+
	'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
}



function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	
	form.parse(request, function(error, fields, files){
		console.log("parsing done");
		
		fs.rename(files.upload.path, "/Dropbox/Skola/D7024E/nodejs_testing_william/image/1.png", function(error) {
			if(error) {
				console.log("rename error, unlinking");
				fs.unlink("/Dropbox/Skola/D7024E/nodejs_testing_william/image/1.png");
				console.log("rename error, renaming");
				fs.rename(files.upload.path, "/Dropbox/Skola/D7024E/nodejs_testing_william/image/1.png");
				console.log("rename error, finished handling");
			}
		});
		
		
		// imagename+=1;
		
		response.writeHead(200, {"Content-Type":"text/html"});
		response.write("Received Image:<br/>");
		response.write("<img src='/show' /");
		response.end();
	});
}

function show(response){
	console.log("Request handler 'show' was called");
	
	fs.readFile("/Dropbox/Skola/D7024E/nodejs_testing_william/image/1.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, { "Content-Type":"image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}




function list(response) {
	console.log("Request handler 'list' was called.");
	exec("ls image/ -lah", function(error, stdout, stderr){
		console.log("executing 'list'");
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write(stdout);
		response.end();
	});
}

exports.start = start;
exports.upload = upload;
exports.list = list;
exports.show = show;
