const fs = require('fs');
const cheerio = require('cheerio');
const srcpath = "../src/elements/";
let $; 

function cleanStr(str){
	str = str.replace(/\t/g, '');
	str = str.replace(/\n/g, '');
	return str;
}

function parseDocComment( docs ){
	let arr = docs.split('@');
	let d = {};

	for (var i = 0; i < arr.length; i++) {
		
		let str = cleanStr(arr[i]);

		if( str.indexOf('name')==0 ){
			str = str.replace('name','');
			d.name = str;

		} else if( str.indexOf('description')==0 ){
			str = str.replace('description','');
			d.description = str;

		} else if( str.indexOf('element')==0 ){
			str = str.replace('element','');
			d.element = str;

		} else if( str.indexOf('attributes')==0 ){
			str = str.replace('attributes','');
			d.attributes = JSON.parse(str);
		}
	}

	return d;
}

fs.readdir(srcpath,(err,files)=>{
	if(err){ console.error(err) }
	else {

		files.forEach((file)=>{
			fs.readFile(srcpath+file,(err,data)=>{
				if(err){ console.error(err) }
				else {
					$ = cheerio.load(data);		
					let docComment = $('dom-module').contents()[0].next.data;
					let docObj = parseDocComment( docComment );
					// console.log( documentation ); // <<<<<<<<<
					fs.writeFile(docObj.name+".json", JSON.stringify(docObj), (err)=>{
						if(err){ console.error(err) }
					});					
				}
			});	
		});		

	}
});

