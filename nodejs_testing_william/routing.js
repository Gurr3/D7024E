//var load = require('./loadbalance');
var exec = require("child_process").exec
//var ip;
//var serverip;
function assignfilename(array, filename, port, callback){
	loadbalance(array, function(ip){
		array.push([filename, ip, port]);
		callback(array);
	});			
}
	//var ip = findactiveip(array);
	//	array.push([1,2,3]);
	//array.push([filename, ip, port]);
	//return array;

//returns a lawful good IP
function loadbalance(array, callback){
	
	if (array.length%10 == 0){
		console.log("Deploying server");
		exec ('ruby vmcreate', 
			function(err,stdout,stderr){
				if(stderr){
					console.log("No new server coud be created, using the old servers only");
					//console.log("error: "+stdout +"\n\n"+stderr);
					//If array out of bounds occurs after this, function loadbalance threw the error
					callback(array[array.length-11][1]);}
				else{
					
					setTimeout(
						function(){
							console.log("VM deployed");
							callback(stdout.trim());
						}
					,10000);
				}
			}
		);
	} else {
		callback(array[array.length-1][1]);}
		//	load.balance(array, 
		//		function(ip){
		//			callback(ip);}
		//		);
			
}



		//callback(array[0][1]);}
		//load.balance(array, 
		//	function(ip){
		//		callback(ip);
		//	}
		//);
	
//callback(function (ip){load.balance())}
//{callback(array[0][1])}
	

function findfilename(array, filename, callback){
	//var arr = [];
	for (var i = 0; i < array.length; i++) {
		var j = array[i][0];
		if (j == filename){
			callback(array[i][1]+":"+array[i][2]);
		}
	}
}

exports.assignfilename = assignfilename;
exports.findfilename = findfilename;

