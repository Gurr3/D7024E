var exec = require("child_process").exec
var express = require('express'), 
	app = module.exports = express(),
	fs = require("fs"),
	util = require("util"),
	formidable = require("formidable"),
	async = require("async"),
	query = require('querystring'),
	routing = require("./routing"),
	spawn = require("./spawn"),
	
	adressarray = [],
	chosen_port = 8000, //start value
	this_port = 8080;
	
	
app.use(express.bodyParser({
  uploadDir: __dirname + '/files',
  keepExtensions: true
}))

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function allocatePort(){
	chosen_port+=1;
	return chosen_port;
}

app.get('/', function(req, res){

	if ( !isNumber(req.subdomains[req.subdomains.length-1])){
		console.log("searching for the adress to reroute: "+req.subdomains[req.subdomains.length-1]);
		routing.findfilename(adressarray, req.subdomains[req.subdomains.length-1], function(ip_port){
			
			console.log("found the adress to: "+ ip_port);
			res.redirect('http://'+ip_port);
		});

	} else{
		res.send('<form method="post" enctype="multipart/form-data">'
			+ '<p>file: <input type="file" name="file" /></p>'
			+ '<p><input type="submit" value="Upload" /></p>'
			+ '<p>Port: <input type="text" name="port" /></p>'
			+ '<p>How many instances: <input type="text" name="instances" value="1" /></p>'
			+ '</form>');
	}
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
	
	console.log("working with post /");
	var to_send = "";
	//console.log(console.dir(req));  // DEBUG: display available fields
	//console.log("\n\n "+console.dir(req.files.file.name)+" \n"); //DEBUG: display filename
	
	var tmp_path = req.files.file.path,
		new_path = __dirname+"/files/"+req.files.file.name;
		port = req.body.port;
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
	
	//update adressarray
	routing.assignfilename(adressarray, req.files.file.name.split(".", 1)[0], allocatePort(), 
		function(array){
			adressarray=array;
			//dossh with the new arrayaddition
			
			
			
			
			
			//TODO: PORTS AND FILENAMES ARE UNDEFINED IN EXEC BELOW, EVEN IF YOU PUT IN 8080 OR SOME OTHER NUMBERS!!!
			//note: 8889 is undefined is probably a reference to the external port in the exec function being handled as a command.
			//below, i've added two exec functions, one does the echo correct, but not the other, still cant get it to work though, fml --signing off
			
			
			
			
			// console.log('adressarray: '+adressarray);
			setTimeout(function(){
				//incorrect
				exec( 'echo nodejs dossh.js choosecom deploy '+adressarray[adressarray.length-1][1]+' '+port+' '+chosen_port+' '+req.files.file.name+' ', function(a, b,c){console.log(b);});
				//correct
				exec( 'echo \"nodejs dossh.js choosecom deploy '+adressarray[adressarray.length-1][1]+' '+port+' '+chosen_port+' '+req.files.file.name+'\"', function(a, b,c){console.log(b);});
				// exec('nodejs dossh.js choosecom deploy '+adressarray[adressarray.length-1][1]+' '+port+' '+chosen_port+' '+req.files.file.name, function(err,stdout,stderr){
				exec('nodejs dosssh.js choosecom deploy 130.240.233.92 8080 8889 helloworldserver8889.js', function(err,stdout,stderr){
						if(stderr){console.log('err:\n'+err+'\nstderr:\n' + stderr+'\nstdout:\n'+stdout);}
						//else{console.log(stdout);}
						
						to_send+='http://'+req.files.file.name.split(".", 1)[0]+'.'+req.host+'.xip.io:'+this_port;
						var x=1;
						while (x<parseInt(req.body.instances)){
							
							var name = req.files.file.name.split(".", 1)[0]+x.toString();
							var outsideport = allocatePort();
							to_send+= '\n'+'http://'+name+'.'+req.host+'.xip.io:'+this_port;
							
							
							console.log("New instance: "+name+", on: "+outsideport);

							spawn.instances(adressarray, name, port, outsideport, req.files.file.name, 
								function(array2){
									adressarray=array2;
								}
							);	
							x=x+1;
						} 
						res.send(to_send);
					})}
			,10000);
		}
	);
	//send back a psuedo website
	//res.send('http://'+req.files.file.name.split(".", 1)[0]+'.'+req.host+'.xip.io:'+this_port+"\n"+to_send);
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
			res.write(file, "binary");
			res.end();
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
  app.listen(this_port);
  console.log('Express started on port %d', this_port);
}
