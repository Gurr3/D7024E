var exec = require("child_process").exec
var async = require('async');
var wait = require('wait.for');
var ip;
var serverip;
function assignfilename(array, filename, port, callback){
	findactiveip(array, function(res){
		array.push([filename, res, port]);
		callback(array);
	});			
}
	//var ip = findactiveip(array);
	//	array.push([1,2,3]);
	//array.push([filename, ip, port]);
	//return array;


function findactiveip(array, callback){
	if (array.length == 0){
		exec ('ruby vmcreate', function(err,stdout,stderr){
			if(stderr){console.log("error: "+stdout +"\n\n"+stderr);}
			else{callback(stdout);}
		});
	} else {callback(array[0][1])}
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

