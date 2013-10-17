var load = require('./loadbalance');
//var ip;
//var serverip;
function assignfilename(array, filename, port, callback){
	findactiveip(array, function(ip){
		array.push([filename, ip, port]);
		callback(array);
	});			
}
	//var ip = findactiveip(array);
	//	array.push([1,2,3]);
	//array.push([filename, ip, port]);
	//return array;


function findactiveip(array, callback){
	
			load.balance(array, 
				function(ip){
					callback(ip);}
				);
			
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

