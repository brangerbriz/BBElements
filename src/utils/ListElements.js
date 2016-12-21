/* jshint esversion: 6 */

// this keeps BBList up to date w/elements in src/elements
// this script must be run from project root

const fs = require('fs');

let data = "module.exports = [";

var files = fs.readdirSync('src/elements');

files.forEach((file)=>{
	data += "'"+file.split('.')[0]+"',";
});

data = data.substr(0,data.length-1);
data += "];";

fs.writeFile( 'src/js/BBList.js', data, (err)=>{
	if(err) console.log(err);
	else console.log('BBList.js saved!');
});



