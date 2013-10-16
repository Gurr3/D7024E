// node dossh.js choosecom deploy 130.240.233.92 8889 files/helloworldserver8889.js


var control = require('control'),
    task = control.task,
	path = require('path'),
	r_addr = process.argv[2];
	
var sq_ip = '130.240.233.77';
var sq_port= '8080';

	
task('choosecom', 'choose which computer to deploy on', function (args) {
	console.log("all: "+ args +" ip: " + args[1]);
	var config;
	console.log("Using server "+args[1]);
	if (args[1]=='130.240.233.93'){
		console.log("dossh: 130.240.233.93");
		config = {'130.240.233.93': {
			user: 'core',
			sshOptions: ['-inyckel2.pem'] 
		}};
		
	//var config = dojson(args[1].toString(), {user : 'core', sshOptions:['incykel2.pem']});
	}else if(args[1]=='130.240.233.92'){
		console.log("dossh: 130.240.233.92");
		config = {'130.240.233.92': {
				user: 'core',
				sshOptions: ['-inyckel2.pem'] 
		}};
	}else{console.log('dossh - fail: '+args[1]);}
    return control.controllers(config);
});


task('deploy', 'deploy the program', function (controller, _, remoteport, filename) {

	var dockerfile;
	//var filename;
	//filename = "helloworldserver.js"
	dockerfile = "echo $'From base\nRUN apt-get update\nRUN apt-get install -y python-software-properties python g++ make\nRUN apt-get update\nRUN apt-get install -y nodejs\nEXPOSE 80\nRUN apt-get install -y curl\nRUN mkdir /var/www\nRUN curl -O "+sq_ip+":"+sq_port+"/"+filename+"' > Dockerfile";
	
	
	 controller.ssh( dockerfile, function () {
				controller.ssh("docker build -t='d/node' .", function(){
					console.log("docker build done");
					controller.ssh('docker run -d -p '+remoteport+':'+remoteport+' d/node /bin/bash -c \"nodejs '+filename+'\"');
					console.log("docker run done");
			}); 
		});
});

task('ps', 'get ps', function(controller) {
	controller.ssh("docker ps");
});

control.begin();