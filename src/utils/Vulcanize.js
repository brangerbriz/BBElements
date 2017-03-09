/* jshint esversion: 6 */

// this creates a vulcanized html file for .import()
// this script must be run from project root

const spawn = require('child_process').spawn;
const fs = require('fs');
const args = process.argv.slice(2);

var files = fs.readdirSync('src/elements');
var pre = '<link rel="import" href="../elements/';
var post = '">';
var buildAll = "";

// prep list of elements to vulcanize
if( args.length === 0 ){
	files.forEach((file)=>{
		buildAll += pre + file + post + '\n';
	});
} else {
	for (var i = 0; i < args.length; i++) {
		var ele = args[i]+'.html';
		if(files.indexOf(ele)<0) console.log(`Vulcanize: ${args[i]} is not a BBElement`);
		else {
			buildAll += pre + ele + post + '\n';
		}
	}
}


// vulcanize that shit!
fs.writeFile( 'src/utils/ele-list.html', buildAll, (err)=>{
	if(err) console.log(`Vulcanize: ${err}`);
	else console.log('Vulcanize: list html file preparred');

	vulc = spawn('node_modules/vulcanize/bin/vulcanize',['src/utils/ele-list.html']);

	vulc.stdout.on('data', (data) => {
		fs.writeFile( 'src/utils/vulcanized-elements.html', data, (err)=>{
			if(err) console.log(`Vulcanize: ${err}`);
			else {
				console.log(`Vulcanize: vulcanized-elements.html saved!`);
				fs.unlink('src/utils/ele-list.html',(err)=>{
					if(err) console.log(`Vulcanize: ${err}`);
					else console.log('Vulcanize: list htmle file removed!');
				});
			}
		});
	});

	vulc.stderr.on('data', (data) => {
		console.log(`Vulcanize: ${data}`);
	});

	vulc.on('close', (code) => {
		console.log(`Vulcanize: child process exited with code ${code}`);
	});

});
