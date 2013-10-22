var exec = require("child_process").exec
//var ip = "FailedIPSetInLoadBalance";
function balance(array, callback){
	//ip = array[0][1];
	var x = array.length%10;
	if (x = 0){
		exec ('ruby vmcreate', 
			function(err,stdout,stderr){
				if(stderr){console.log("error: "+stdout +"\n\n"+stderr);}
				else{
					console.log("Deloying new vm");
					//setTimeout(
					//	function(stdout){
					callback(stdout.trim());
					//	}
					//,10000);
				}
			}
		);
	} else {callback(array[0][1]);}
}
exports.balance = balance;