var routing = require('./routing');

function instances(array, name, port, filename){
	routing.assignfilename(array, filename.split(".", 1)[0], port, 
		function(res){
			exec('nodejs dossh.js choosecom deploy '+name+' '+port+' '+filename);
			callback(res);
	});
}
