/* jshint esversion: 6 */
class BBElementsClass {

	constructor(){

		this.list = [
			'js/BBElementsFiles/polymer/polymer.html'
		];

		this.ready = [];

		this.allBBElements = require('./js/BBList');

		this.fontStyes = require('./js/BBFonts');
		this.usingUnresolvedStyles = false;
		this.unresolvedStyles = require('./js/UnresolvedStyles');

		// load fonts
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = this.fontStyes;
		document.querySelector('head').appendChild(style);

		window.addEventListener('load',()=>{
			this.numberNotes();
			this.makeMarginalNotes();
			this.initResize();
		});

	}

	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ private methods

	removeUnresolvedRule( tagName ){
		for (var i = 0; i < document.styleSheets.length; i++) {
			if( document.styleSheets[i].ownerNode.id == "unresolvedStyles"){
				var sheet = document.styleSheets[i];
				for (var j = 0; j < sheet.cssRules.length; j++) {
					if( sheet.cssRules[j].selectorText == tagName ){
						sheet.deleteRule(j);
						if(tagName=="bb-p"){
							for (var x = 0; x < 4; x++) sheet.deleteRule(j);
						} else if(tagName=="bb-media"){
							for (var y = 0; y < 2; y++) sheet.deleteRule(j);
						} else if(tagName=="bb-tags"){
							sheet.deleteRule(j);
						} else if(tagName=="bb-container"){
							sheet.deleteRule(j);
						}
						break;
					}
				}
			}
		}
	}

	eleReady( ELE ){ // called inside bb-elements html files
		var ele = ELE.tagName.toLowerCase();
		if( this.allBBElements.indexOf( ele ) >= 0 && this.ready.indexOf(ele)<0 ){
			this.ready.push( ele );
			if( this.progressBar ){
				// update progress bar
				var progress = BBElements.ready.length/(BBElements.list.length-1);
				this.progressBar.style.width = (this.loadingBar.offsetWidth-2) * progress +"px";
			}
			if( this.usingUnresolvedStyles ) this.removeUnresolvedRule( ele );
		} else if( this.allBBElements.indexOf( ele ) <0  ) {
			throw new Error('BBElements: '+ele+' is not an official BB Element');
		}

		if( this.ready.length == (this.list.length-1) && this.progressBar ){
			// 					 ^ -1 for polymer lib
			this.hideLoader();
		}
	}

	hideLoader(){
		this.fadeOutLoader();
	}

	lazyLoadList(){
		// console.log('BBElements: loaded 0 of '+(this.list.length-1));
		// load polymer && all the bb-elements listed
		this.list.forEach(function(elementURL) {
			var elImport = document.createElement('link');
			elImport.rel = 'import';
			elImport.href = elementURL;
			document.head.appendChild(elImport);
		});
	}

	numberNotes(){
		var notes = document.querySelectorAll('bb-note');
		for (var i = 0; i < notes.length; i++) {
			notes[i].textContent = i+1;
		}
	}

	makeNote( num, info ) {
		var s1 = document.createElement('span');
		var s2 = document.createElement('span');
		s1.style.color = "#e40477";
		s1.textContent = num+'. ';
		// s2.style.color = "#c4c4c4";
		s2.style.color = "#A7A8A7";
		s2.innerHTML = info; // maybe parse string for <a> && createElement('a')
							 // rather than .innerHTML, which is 'technically' unfavorable
		var div = document.createElement('div');
		div.style.marginBottom = "10px";
		div.appendChild( s1 );
		div.appendChild( s2 );
		return div;
	}

	makeMarginalNotes(){
		var notes = document.querySelectorAll('bb-note');

		// organize notes by parent elements
		var dict = {};
		for (var i = 0; i < notes.length; i++) {
			var pid; // parent id
			var parent = notes[i].parentNode;

			if( parent.getAttribute('data-pid')===null ){
				pid = i;
				// create pid ...
				parent.setAttribute('data-pid',pid);
				// ...&& add prop to dict
				dict[pid] = [];
			} else {
				// get pid
				pid = parent.getAttribute('data-pid');
			}

			// add this child to proper parent prop
			dict[pid].push({
				ele: notes[i],
				num: notes[i].textContent,
				info: notes[i].getAttribute('info')
			});
		}

		// create an "aside" per parent element && insert coresponding notes
		for( var p in dict ){
			// create aside
			var aside = document.createElement('aside');
			aside.style.float = "right";
			aside.style.fontSize = "12px";
			aside.style.width = "250px";
			aside.style.marginRight = "-"+(250+32)+"px";
			// append individual notes
			for (var j = 0; j < dict[p].length; j++) {
				var n = this.makeNote( dict[p][j].num, dict[p][j].info );
				aside.appendChild( n );
			}
			// insert aside into parent
			var pNode = dict[p][0].ele.parentNode;
			pNode.insertBefore( aside, pNode.childNodes[0] );

		}

	}

	fadeOutLoader() {
		var self = this;

		function func() {
			// interval / duration
			var dec = 100 / 500;
			var opac = parseFloat(self.loadingScreen.style.opacity) - dec;
			self.loadingScreen.style.opacity = opac;

			if(opac <= 0){
				window.clearInterval(fading);
				self.loadingScreen.remove();
			}
		}

		var fading = window.setInterval(func, 100);
	}

	initResize() {
		var self = this;
		if( document.querySelector('bb-container') !== null ){
			// if responsive container present...
			if( typeof document.querySelector('bb-container').resize=="function" ){
				// ...and if it's methods are loaded, do an initial resize
				document.querySelector('bb-container').resize();
				console.log('got it!');
			} else {
				console.log('...not ready');
				setTimeout(function(){
					self.initResize();
				},500);
			}
		}
	}

	// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ public methods

	import( vulcanizedFile ){
		var self = this;

		var progress = 0;
		var total = 3;

		function updateProgBar(){
			if( self.progressBar ){
				progress++;
				self.progressBar.style.width = (self.loadingBar.offsetWidth-2) * progress/total +"px";
				if( progress == total ) self.hideLoader();
			}
		}

		function loadPolymerAndVFile(){
			// load polymer
			var linkP = document.createElement('link');
			linkP.rel = 'import';
			linkP.href = self.list[0];
			linkP.onload = function(){ updateProgBar(); };
			document.head.appendChild(linkP);
			// load vulcanized file
			var linkV = document.createElement('link');
			linkV.rel = 'import';
			linkV.href = vulcanizedFile;
			linkV.onload = function(){ updateProgBar(); };
			document.head.appendChild(linkV);
		}

		/**
		* Conditionally loads webcomponents polyfill if needed.
		* Credit: Glen Maddern (geelen on GitHub)
		*/
		// ++ also load polymer && all the bb-elements from vulcanized file
		var webComponentsSupported = ('registerElement' in document &&
			'import' in document.createElement('link') &&
			'content' in document.createElement('template'));

		if (!webComponentsSupported) {
			var wcPoly = document.createElement('script');
			wcPoly.src = 'js/BBElementsFiles/webcomponentsjs/webcomponents-lite.min.js';
			wcPoly.onload = function(){
				updateProgBar();
				loadPolymerAndVFile();
			};
			document.head.appendChild(wcPoly);
		} else {
			updateProgBar();
			loadPolymerAndVFile();
		}
	}

	lazyLoad( eleList ){
		var self = this;

		// add chosen elements to load list
		if( typeof eleList !== "undefined" ){

			if( eleList instanceof Array ){

				eleList.forEach(function(str){
					if( typeof str == "string" ) self.list.push( 'js/BBElementsFiles/'+str+'.html' );
					else throw new Error('BBElements lazyLoad: expecting an Array of stirngs');
				});

			} else {
				throw new Error('BBElements lazyLoad: expecting an Array of strings, but got a ' + typeof eleList );
			}
		} else {
			// otherwise load all bb-elements by default
			this.allBBElements.forEach(function(str){
				self.list.push( 'js/BBElementsFiles/'+str+'.html' );
			});
		}

		/**
		* Conditionally loads webcomponents polyfill if needed.
		* Credit: Glen Maddern (geelen on GitHub)
		*/
		// ++ also load polymer && all the bb-elements listed
		var webComponentsSupported = ('registerElement' in document &&
			'import' in document.createElement('link') &&
			'content' in document.createElement('template'));

		if (!webComponentsSupported) {
			var wcPoly = document.createElement('script');
			wcPoly.src = 'js/BBElementsFiles/webcomponentsjs/webcomponents-lite.min.js';
			wcPoly.onload = function(){ self.lazyLoadList(); };
			document.head.appendChild(wcPoly);
		} else {
			this.lazyLoadList();
		}
	}

	usePlaceholderCSS(){
		this.usingUnresolvedStyles = true;
		// When modifying bb-element's default styles
		// u must then create ur own unresolvedStyles
		// TODO: figure out a good convention for this
		// ...simply adding extra styles won't work
		// ...probaby need to replace the coresponding style on the list
		// ...+keep track so removeUnresolvedRule still works as it should
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = "unresolvedStyles";
		style.innerHTML = this.unresolvedStyles;
		document.querySelector('head').appendChild(style);
	}

	useLoadingScreen(){
		this.loadingScreen = document.createElement('div');
		this.loadingScreen.style.opacity = "1";
		this.loadingScreen.style.display = "block";
		this.loadingScreen.style.position = "fixed";
		this.loadingScreen.style.top = "0px";
		this.loadingScreen.style.zIndex = 99999999999999999999;
		this.loadingScreen.style.width = "100%";
		this.loadingScreen.style.height = "100%";
		this.loadingScreen.style.backgroundColor = "#e40477";

		this.loadingTxt = document.createElement('div');
		this.loadingTxt.style.paddingTop = innerHeight/2-34/2+"px"; // 34 || 14
		this.loadingTxt.style.color = "white";
		this.loadingTxt.style.fontFamily = "'Graphik-Regular'";
		this.loadingTxt.style.textAlign = "center";
		this.loadingTxt.textContent = "loading";

		this.loadingBar = document.createElement('div');
		this.loadingBar.style.height = "10px";
		this.loadingBar.style.width = "140px";
		this.loadingBar.style.margin = "6px auto";
		this.loadingBar.style.border = "1px solid #fff";

		this.progressBar = document.createElement('div');
		this.progressBar.style.height = "10px";
		this.progressBar.style.width = "0px";
		this.progressBar.style.backgroundColor = "#fff";
		this.loadingBar.appendChild( this.progressBar );

		this.loadingScreen.appendChild( this.loadingTxt );
		this.loadingScreen.appendChild( this.loadingBar );


		document.body.appendChild( this.loadingScreen );

	}
}

window.BBElements = new BBElementsClass();


/*

	GENERAL TODO:
	- script for creating custom vulcanized builds?
	- fix mobile full-width image bug ( appears on only some phones )


*/
