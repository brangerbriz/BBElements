/* jshint esversion: 6 */

// this copies BBElements.js's dependencies over into the build folder
// this script must be run from project root

const fs = require('fs');
const rmdir = require('rimraf');
const ncp = require('ncp').ncp;
ncp.limit = 16;

rmdir('build/js/BBElementsFiles', function(err){
	if(err) console.error(err);
	else {

		console.log('Old Build Files Removed');

		fs.mkdirSync('build/js/BBElementsFiles');

		ncp('bower_components/', 'build/js/BBElementsFiles/', function (err) {
			if (err) console.error(err);
			else console.log('Dependencies Copied to Build');
		});

		ncp('src/elements/', 'build/js/BBElementsFiles/', function (err) {
			if (err) console.error(err);
			else console.log('Elements Copied to Build');
		});

		ncp('src/utils/vulcanized-elements.html', 'build/js/BBElementsFiles/vulcanized-elements.html', function (err) {
			if (err) console.error(err);
			else console.log('vulcanized-elements.html Copied to Build');
		});
	}
});
