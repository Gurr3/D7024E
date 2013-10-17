var exec = require("child_process").exec
var array = [];
var serverip;
if (array.length == 0){
	exec ('ruby vmcreate', function(err,stdout,stderr){
	if(stderr){
			 console.log("error: "+stdout +"\n\n"+stderr);
		 }else{
//			 console.log("executing "+new_path+"\nThe Executed program says:\n");
			 console.log(stdout);
			//to_send = "The Executed program says:\n"+stdout;
			serverip = stdout;
		}
	});
} else {
	serverip = array[0];
}
console.log("hej"+serverip);
