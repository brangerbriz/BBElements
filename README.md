# BBElements.js

is a front-end JavaScript library for using custom HTML elements that conform to the Branger_Briz brand. The library uses the [webcomponents polyfill](https://github.com/webcomponents/webcomponentsjs) as well as the [Polymer library](https://www.polymer-project.org/1.0/) for creating the actual custom elements. The BBElements library itself handles the following:

	- conditionally loads polyfill
	- lazy loads polymer
	- lazy loads BB fonts CSS
	- lazy loads elements ( all or from a custom list )
	- alternativly, can load a [vulcanized](https://github.com/Polymer/vulcanize) elements html file
	- provides optional loading helpers:
		- display unresolved CSS on elements before they've finished loading ( removed after fully loaded )
		- display loading screen with a progress bar
	- handles some DOM manipulation related to marginal notes ( `<bb-note>` )


## usage
	
the BBElements.js library and it's dependencies folder ( BBElementsFiles/ ) must be kept inside a js/ folder kept along side the HTML file making use of the library. In order to avoid [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) include the library in the `<head>` of your HTML page:

```html
<script src="js/BBElements.js"></script>
```	

then right below that ( still in the `<head>` ) inside an empty pair of `<script>` tags you can choose one of two ways for loading the custom BB elements. The first method is to "lazy-load" the individual elements:

```javascript
BBElements.lazyLoad();
// by default that loads all the custom BB elements
// alternatively you can specify which you want to load
// by passing in an array of the desired elements
BBElements.lazyLoad([
	'bb-logo',
	'bb-h1'
]);
```

The alternative method ( rather than lazy-loading the individual elements ) is to import a [vulcanized](https://github.com/Polymer/vulcanize) file with the desired elements like so:

```javascript
BBElements.import('path/to/vulcanized-file.html');
```
### optional methods

The page renders before the custom elements are fully loaded ( which creates a [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)*-ish* messyness, as described [here](https://aerotwist.com/blog/polymer-for-the-performance-obsessed/#the-performance-problem) ). There are a couple of optional methods for handling this. The first is to load a temporary style sheet ( which approximates what the custom elements should look like once fully loaded ) which is later removed once the custom elements have fully loaded. To use this add the following below the call to `.lazyLoad()` or `.import()`:

```javascript
BBElements.usePlaceholderCSS();
```

Alternatively, you could also use a loading screen ( with a progress bar ) which fades out once all the custom elements have fully loaded. To use this create a new pair of `<script>` tags at the top of your `<body>` tag with the following:

```javascript
BBElements.useLoadingScreen();
```

**NOTE:** the `.useLoadingScreen()` method MUST be called at the top of your `<body>` tag, it will not work in the `<head>` because it needs to `document.body.appendChild` the load screen ( and document.body does not exist until after `<body>` opening tag ), and it must come before all other elements so that we don't see anything flash before the load screen appears.


### the elements

see the example.html file in the build folder for a demonstration on how to use the elements ( better docs coming soon )


## dev notes

First make sure to `npm install` as well as `bower install` ( assuming you have npm and bower installed locally ). The following npm dev scripts are included:

to lint source code 
```
npm run lint 
```

to build docs
```
npm run docs 
```

to build the library ( as well as collect all the libraries dependencies and copy them into build/js/BBElementsFiles ) into build/js/BBElements.js ( the build process also lints and creates docs )
```
npm run build 
```

to watch changes to src/*.js
```
npm run watch
```