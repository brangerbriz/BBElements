# BBElements

is a collection of CSS libraries and a JavaScript library for styling HTML pages which conform the the Branger_Briz brand. Unlike the previous iteration of BBElements (see v1 branch), this version has no third party dependencies nor does it require a build system, it's 100% vanilla CSS and JavaScript.

include the `css` and `js` folder in this repo in any project you want to use BBElements in. Then make sure to include `<link rel="stylesheet" href="css/bb-styles.css">` in your `<head>`, and if you want to optionally make the elements responsive you can additionally include `<link rel="stylesheet" href="css/bb-responsive.css">` (which has all the necessary media-queries). Also make sure to include `<script src="js/BBElements.js"></script>` at the bottom of your `<body>`. Once you've included those you can use BBElements like so:


### BB Logo
You can include an SVG of the BB logo with the code below. It has a few optional attributes including `width` which changes the size of the logo, `data-brand-color` which changes the default pink color, `data-text-color` which changes the default black text color and `data-fill-color` which changes the white color of the B inside the cirlcle mark.
```html
<section id="logo"></section>
```

### headers
```html
<h1> larger black titles </h1>
<h2> large black titles </h2>
<h3> small pink titles </h3>
```

### pull quotes
For large pull quotes (ie. outside of `<p>` or `<div>` elements) include them inside a `span.quote` element. They take an optional `data-credit` attribute which will appear in lighter font below the quote. These can include links written in markdown syntax
```html
<span class="quote" data-credit="Dr. Ipsum [publication](https://website.org)">
    This is something someone said
</span>
```

### media elements
To format media elements properly, include them inside a `section.media` element. These take an optional `data-fullwidth` property. Inside media elements you can include `<img>` elements. If the elment has an `alt` attribute, the value of the attribute will be used as the caption for the media element. These captions cal also include links written in markdown syntax.
```html
<section class="media" data-fullwidth="true">
    <img src="image.jpg" alt="picture of a [cool](http://cool.com) cat">
</section>
```

### divs and paragraphs
```html
<p> this will be styled like default BB copy </p>
<div> this will be styled like default BB copy </div>

<div class="date">used for dates below h3 tags</div>

<p>
    <a href="page">Links</a> inside of p or div elements will be styled
    accordingly. You can also include <img src="images"> as well as
    <span class="quote">pull quotes like this</span>, and they will be
    formatted properly as per our style guide.
</p>

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

### tag elements
```html
<span class="tags">
    <a href="#">Generative</a>
    <a href="#">Installation</a>
    <a href="#">Digital Literacy</a>
</span>
```
