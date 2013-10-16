var exec = require("child_process").exec
var async = require('async');
var wait = require('wait.for');
var ip;
var serverip;

function assignfilename(array, filename, port){
		wait.launchFiber(banan(array,filename,port));
		return array;
}

function banan(array,filename,port){
	// ip =(findactiveip(array));
	var ip = wait.forMethod(findactiveip,array,ip); 
	array.push([filename, ip, port]);
	return array;	
		
});
	//var ip = findactiveip(array);
	//	array.push([1,2,3]);
	//array.push([filename, ip, port]);
	//return array;

function ex(){
	exec('ruby vmcreate', function(err,stdout,stderr){
			if(stderr){console.log("error: "+stdout +"\n\n"+stderr);}
			else{return stdout;}
		});
}

function findactiveip(array){
	if (array.length == 0){
		var ip = wait.forMethod(ex);
	} else {
		return array[0][1];	
	}
}

function findfilename(array, filename){
	for (var i = 0; i < array.length; i++) {
		var j = array[i][0];
		if (j == filename){
			return array[i][1]+":"+array[i][2]}
	}
}

exports.assignfilename = assignfilename;
exports.findfilename = findfilename;

