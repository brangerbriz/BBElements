# BBElements

is a collection of libraries for styling HTML pages which conform to the Branger_Briz brand. Unlike the previous iteration of BBElements (see v1 branch), this version does not require any build systems and can be used with no third party dependencies (see `pre.code` for exception) it's 100% human readable vanilla CSS and JavaScript.

## usage

clone this repo and include the `css` and `js` folders any project you want to use BBElements in (you can optionally include the images folder if you need the BB logo svg files). Then in your `<head>` make sure to include:
```html
<!-- this is the only 100% required CSS file -->
<link rel="stylesheet" href="css/bb-styles.css">
<!-- optionally: if you want media-queries for responsive layout -->
<link rel="stylesheet" href="css/bb-responsive.css">
<!-- optionally: if you want code snippets to be syntax highlighted -->
<link rel="stylesheet" href="css/bb-code-colors.css">
```

Then in at the bottom of you `<body>` make sure to include:
```html
<!-- optionally: if you want code snippets to be syntax highlighted -->
<script src="js/highlightJS/highlight.pack.js"></script>
<!-- this is the only 100% required JS file -->
<script src="js/BBElements.js"></script>
```

Once you've included those you can use BBElements as described below. You can also take a look at [the example file](example.html) for reference.


### BB Logo
You can include an SVG of the BB logo with the code below. It has a few optional attributes including `width` which changes the size of the logo, `data-brand-color` which changes the default pink color, `data-text-color` which changes the default black text color and `data-fill-color` which changes the white color of the B inside the circle mark. There is also an optional `href` attribute, which specifies where to link the logo to (default is our website)
```html
<section id="logo"></section>
```

### headers
```html
<h1> larger black titles </h1>
<h2> large black titles </h2>
<h3> small pink titles </h3>
```

### divs and paragraphs
Both `p` and `div` tags conform to the basic copy style of the BB brand.
```html
<p> this will be styled like default BB copy </p>
<div> this will be styled like default BB copy </div>
```
there is an optional `date` class specifically used under `h3` elements (ex: underneath the attribution of a blog post)
```html
<div class="date">January 1, 2045</div>
```
Any `code`,`a`,`span.quote`,`img` elements inside of `p` and `div` elements will be formatted properly.
```html
<p>
    <a href="page">Links</a> inside of p or div elements will be styled
    accordingly. You can also include <img src="images"> as well as
    <code>code</code> and <span class="quote">pull quotes like this</span>,
    and they will be formatted properly as per our style guide.
</p>
```

### marginal notes
To include marginal notes simply add a `span.marginal-note` element inside of a `p` element, beside the word which you want to annotate. The BBElements library will take care of creating all the numbers as well as the marginal note asides. The `span` must also include a `data-info` attribute with the information you want displayed in the margin. These can also include links written in markdown syntax.
```html
<p>
    You can also include marginal notes like this <span class="marginal-note"
    data-info='[Lorem ipsum](https://www.wikipedia.org/) dolor sit amet,
     [consectetur](https://www.wikipedia.org/) adipisicing elit. Nisi,
     corporis.'></span>. That span will become the appropriate number
     (depending on how many marginal notes are before it in this page) and will
     create an aside with the info in the data-info attribute. You can create
     using markdown syntax as seen above.
</p>
```


### block quotes
For large pull quotes (ie. outside of `<p>` or `<div>` elements) include them inside a `span.quote` element. They take an optional `data-credit` attribute which will appear in lighter font below the quote. These can include links written in markdown syntax.
```html
<span class="quote" data-credit="Dr. Ipsum [publication](https://website.org)">
    This is something someone said
</span>
```

### media elements
To format large media elements properly (ie. outside of `<p>` or `<div>` elements), include them inside a `section.media` element. These take an optional `data-fullwidth` property. Inside media elements you can include `<img>` elements. If the element has an `alt` attribute, the value of the attribute will be used as the caption for the media element. These captions can also include links written in markdown syntax.
```html
<section class="media" data-fullwidth="true">
    <img src="image.jpg" alt="picture of a [cool](http://cool.com) cat">
</section>
```

### code snippets
For large code examples (ie. outside of `<p>` or `<div>` elements) include them inside a `code` element within a `pre.code` element. You can optionally word wrap the code by setting the `data-wrap` attribute to "true". If you are optionally using `bb-code-colors.css` and  [`highlight.js`](https://highlightjs.org/) for syntax highlighting (see usage notes above) then you can also specify what language the code snippet is in by specifying it in the `code` element's `class` attribute.
```html
<pre class="code">
    <code class="js" data-wrap="true">
        var x = 100;
        var y = 100;

        for(var i=0; i&lt;100; i++){

            z = Math.random() * 100;
            drawStuff(x,y,z);

        }
    </code>
</pre>
```

### tag elements
```html
<span class="tags">
    <a href="#">Generative</a>
    <a href="#">Installation</a>
    <a href="#">Digital Literacy</a>
</span>
```
