var routing = require('./routing');
var exec = require("child_process").exec

function instances(array, name, port, outsideport, filename, callback){
	routing.assignfilename(array, name, outsideport, 
		function(res){
			exec('nodejs dossh.js choosecom deploy '+array[array.length-1][1]+' '+port+' '+outsideport+' '+filename, 
				function(err,stdout,stderr){
					if(stderr){console.log(stderr);}
					//else{console.log(stdout);}				
				}
			);
			callback(res);
		}
	);
}
exports.instances = instances;
