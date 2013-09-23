var exec = require("child_process").exec
var express = require('express'), 
	app = module.exports = express(),
	fs = require("fs"),
	util = require("util"),
	formidable = require("formidable"),
	query = require('querystring');
  
app.use(express.bodyParser({
  uploadDir: __dirname + '/files',
  keepExtensions: true
}))

app.get('/', function(req, res){
  res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>file: <input type="file" name="file" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});

app.get( '/files',function(req,res){

	var path= __dirname+"/files/";
		
	fs.readdir(path, function(err, files){
		if (err){
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(error + "\n");
			res.end();
		} else {
			res.writeHead(200, { "Content-Type":"text/html"});
			files.forEach(function(file){
				res.write('<a href=\"' + file + '\">' + file + '<br>');
			});
			res.end();
		}
	});
});

app.post('/', function (req, res) { //saves the file given
	
	console.log(console.dir(req));  // DEBUG: display available fields
	//console.log("\n\n "+console.dir(req.files.file.name)+" \n"); //DEBUG: display filename
	
	var tmp_path = req.files.file.path,
		new_path = __dirname+"/files/"+req.files.file.name;
	
	fs.rename(tmp_path,new_path,function(err) {
		if (err){
			console.log("rename error, unlinking");
			fs.unlink(tmp_path);
			console.log("File already exists");
			//fs.rename(tmp_path, new_path);
			console.log("rename error, finished handling");
			res.send("File already exists");
		}
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
		fs.unlink(tmp_path, function() {
			if (err) throw err;
		});
	});
	exec("node "+new_path, function(err,stdout,stderr){
		if(stderr){
			console.log("error: "+stdout +"\n\n"+stderr);
		}else{
			console.log("executing "+new_path);
			console.log(stdout);
		}
		
	});
	res.redirect("/files");
});

app.get('/:file(*)', function(req, res, next){
	var file = req.params.file,
		path = __dirname + '/files/' + file;
	
	fs.readFile(path, "binary", function(error, file) {
		if (error) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(error + "\n");
			res.end();
		} else {
			res.redirect('http://www.google.se');
			// res.write(file, "binary");
			// res.end();
		}
	});
  //res.download(path);
});

// error handling middleware. Because it's
// below our routes, you will be able to
// "intercept" errors, otherwise Connect
// will respond with 500 "Internal Server Error".
app.use(function(err, req, res, next){
  // special-case 404s,
  // remember you could
  // render a 404 template here
  if (404 == err.status) {
    res.statusCode = 404;
    res.send('Cant find that file, sorry!');
  } else {
    next(err);
  }
});

if (!module.parent) {
  app.listen(8080);
  console.log('Express started on port %d', 8080);
}