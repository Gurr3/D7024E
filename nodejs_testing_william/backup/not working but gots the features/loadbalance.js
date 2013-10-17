
var ip = "FailedIPSetInLoadBalance";
function balance(array, callback){
	ip = array[0][1];


	callback(ip);
}
exports.balance = balance;
