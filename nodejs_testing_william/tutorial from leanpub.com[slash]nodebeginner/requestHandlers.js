var exec = require("child_process").exec
var querystring = require("querystring"), 
	fs = require("fs"),
	formidable = require("formidable");


function start(response) {
	console.log("Request handler 'start' was called");
	
	// var body ='<html>'+
	// '<head>'+
	// '<meta http-equiv="Content-Type" '+
	// 'content="text/html; charset=UTF-8" />'+
	// '</head>'+
	// '<body>'+
	// '<form action="/upload" enctype="multipart/form-data" '+
	// 'method="post">'+
	// '<input type="file" name="upload"  multiple="multiple">'+
	// '<input type="submit" value="Upload file" />'+
	// '</form>'+
	// '</body>'+
	// '</html>';

	// response.writeHead(200, {"Content-Type" : "text/html"});
	// response.write(body);
	// response.end();

	  res.send('<form action="/upload" method="post" enctype="multipart/form-data">'
		+ '<p>Data: <input type="text" name="filename" /></p>'
		+ '<p>file: <input type="file" name="file" /></p>'
		+ '<p><input type="submit" value="Upload" /></p>'
		+ '</form>');
	}



function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	console.log(console.dir(request.files));  // DEBUG: display available fields
	console.log(console.dir(request.file));  // DEBUG: display available fields
	console.log(console.dir(request.body));  // DEBUG: display available fields
		
	var form = new formidable.IncomingForm(),
		tmp_path = request.files.file.path,
		new_path = __dirname+"/files/"+request.body.filename;
	
	fs.rename(tmp_path,new_path,function(err) {
		
		if (err){
		console.log("rename error, unlinking");
				fs.unlink("/Dropbox/Skola/D7024E/nodejs_testing_william/image/1.png");
				console.log("rename error, renaming");
				fs.rename(files.upload.path, "/Dropbox/Skola/D7024E/nodejs_testing_william/image/1.png");
				console.log("rename error, finished handling");
		}
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
        });
	});
	res.redirect("/show");
};

function show(response){
	console.log("Request handler 'show' was called");
	
	fs.readFile(__dirname+"katt.png", "binary", function(error, file) {
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
