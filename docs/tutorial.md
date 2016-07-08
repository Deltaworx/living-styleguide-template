# Building a living styleguide tool with Metalsmith

Since I had to "break some stone" -- or rather, shape some metal -- while building this living styleguide template with metalsmith, I decided to add this as a reference for the future self and for my teammates. Maybe it can be useful for the folks out on the webs as well!

Since I'm a Metalsmith n00b, I had some trouble trying to find documentation among the wealth of resources out there. As such, this tutorial goes REALLY slow, in baby steps...

## 1. Installing Metalsmith, and performing a base test

Start by experimenting a bit and getting to know Metalsmith.
To install metalsmith, run:

```sh
npm init
npm install metalsmith --save-dev
```

Now, edit `index.js` and add the code below:

```javascript
var Metalsmith = require('metalsmith');

Metalsmith(__dirname)    // src by default
  .destination('./build')
  .build(function(err) {
    if(err) throw err;
    console.log('Build finished');
  })
```

To test this code, edit `src/index.md` and add

```markdown
## Hello, world!
Testing 1 2 3
```

To run, do:

```sh
node index.js
```

Now do

```sh
ls build
```

`index.md` should be there. Is it? Good! You can go to the next baby steps.

## 2. Add markdown parsing

Now that we have metalsmith copying files from one folder to another (very useful!) we will add markdown parsing to our living styleguide.

Run:

```sh
npm install metalsmith-markdown --save-dev
```

And then, add the following to your `index.js`:

```javascript
var Metalsmith = require('metalsmith');

Metalsmith(__dirname)    // src by default
  .destination('./build')
  .use(markdown())
  .build(function(err) {
    if(err) throw err;
      console.log('Build finished');
  })
```

Now, when you run `node index.js`, you should see `index.html`, correctly parsed, inside `build/`.

## 3. Add a layout template

Run:

```sh
npm install metalsmith-layouts --save-dev
```

```javascript
Metalsmith(__dirname)
  .destination('./build')
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts'
  }))
  .build(function(err) {
    if(err) throw err;
    console.log('Build finished');
  });
```

## 4. Add something interesting to the template

## 5. Add navigation to the template

  SPENT HOURS CHASING THIS BUG...

  Metalsmith(__dirname)
  .destination('./build')
  .use(date())
  .use(collections({
    bla1: {
      pattern: 'folder1/*',
      refer:   true
    },
    bla2: {
      pattern: 'folder2/*',
      refer:   true
    }}))
  .use(markdown())
  .use(permalinks({
    pattern: ':collections/:title'
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts'
  }))
  .use(myLogger)
  .build(function(err) {
    if(err) throw err;
    console.log('Build finished');
  });


  if permalinks is not GLUED to collections in this fashion then 'previous' and 'next' won't work!


  CORRECT:

Metalsmith(__dirname)
  .destination('./build')
  .use(date())
  .use(markdown())
  .use(collections({
    bla1: {
      pattern: 'folder1/*',
      refer:   true
    },
    bla2: {
      pattern: 'folder2/*',
      refer:   true
    }}))
  .use(permalinks({
    pattern: ':collections/:title'
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts'
  }))
  .use(myLogger)
  .build(function(err) {
    if(err) throw err;
    console.log('Build finished');
  });


## 6. Try implementing a simple plugin

Simple logger...

```javascript
function myLogger(files, metalsmith, done) {
  console.log('Files: ');
  console.log(files);
  console.log('\nMetalsmith: ');
  console.log(metalsmith);
  done();
}
```

## 7. Add a server

## 8. Deploy to heroku

## 9 Include assets

# Future work

Adding plugins:

## Actually useful

* [Metalsmith headings](https://github.com/segmentio/metalsmith-headings) - A Metalsmith plugin that extracts headings from HTML files and attaches them to the file's metadata.

* [Metalsmith assets]()

## Nice to have

* [Metalsmith Word count](https://www.npmjs.com/package/metalsmith-word-count) - Metalsmith plugin to compute wordcount / average reading time of all paragraphs in a html file


# Tips and tricks

  Anything that is present in the frontmatter is automatically present as a variable in a template.

  In handlebars, you can use "log" to debug like this:

{{#if next}}
{{log title}}
{{log next.path}}

# Useful plugins

* [Metalsmith collections](https://github.com/segmentio/metalsmith-collections)

* [A Metalsmith plugin for registering Handlebars helpers](https://www.npmjs.com/package/metalsmith-register-helpers)

# References

## Metalsmith "Base" Tutorials

* [Robin Thrift's Metalsmith tutorials](http://www.robinthrift.com/posts/getting-to-know-metalsmith/) - this tutorial is divided into four parts: Getting to Know Metalsmith, Part 1 - Setting Up the Forge, Part 2 - Shaping The Metal, Part 3 - Refining Our Tools. The tutorials go from 0 to setting up a full blog with some plugins. are rather detailed and would be the resouce that I advise you to start with. However, they are a bit outdated (from 2014), which might make things a little more difficult. Still a great overview, with a final part focusing on more advanced stuff.

* [Awesome metalsmith tutorials](https://github.com/metalsmith/awesome-metalsmith/tree/master/tutorials) - a bit less complete than Robin Thrift's tutorials, but still a nicely organized refence if you would like to have an idea of how to do things in another way. They also have a [curated list of awesome Metalsmith resources](https://github.com/metalsmith/awesome-metalsmith).

* [How to create a static site with Metalsmith](https://www.sitepoint.com/create-static-site-metalsmith/) - a very short introduction that doesn't go deep into the details but is nice to have an overview. Also includes a demonstration website, and an overview of handlebar partials.

* [Introduction to Metalsmith](http://blog.andyjiang.com/introduction-to-metalsmith/) - a really short introduction with some tips for further plugins that you can use.

* [The way of Metalsmith](http://blog.lecomte.me/posts/2014/way-of-metalsmith/) - really short intro to how metalsmith works with a very good flow diagram of how plugins are invoked.

* [Building Technical Documentation with Metalsmith](https://segment.com/blog/building-technical-documentation-with-metalsmith/) -

## Building plugins

* [Metalsmith plugins](http://www.andrewgoodricke.com/blog/metalsmith-plugins/) - a good intro to Metalsmith plugins by Andrew Goodricke

* [Building a complex metalsmith plugin](http://blog.lecomte.me/posts/2015/build-complex-metalsmith-plugin/) - an example of building a metalsmith plugin that is a bit more advanced.

* [Metalsmith more meta custom plugin](https://github.com/sitepoint-editors/metalsmith-demo/blob/master/lib/metalsmith-moremeta.js) - not a tutorial, but a nice way to look at a well structured and contained plugin.

## Handlebars

* [Handlebars builtin helpers](http://handlebarsjs.com/builtin_helpers.html) - this was my first time using handlebars, and this list of builtin helpers is great for having an idea of what you can do using handlebars.

## Deploying

* [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) - the best reference for deploying a Node.js based app to Heroku.

* [Deploying a Free Static Site with Metalsmith, Node, and Heroku](http://blog.sneagan.com/deploying-a-free-static-site-with-metalsmith-node-and-heroku/) - short and quick reference for deploying a metalsmith static site to heroku using node and express.


# Twilight zone

The metalsmith-metadata configuration files path need to be inside `__dirname` (which is `src` by default) -- as seen in [this issue](https://github.com/segmentio/metalsmith-metadata/issues/5).

# Questions

I'm still a n00b at Metalsmith myself, but I caught a small bug very early on and the folks at [Metalsmith Slack](https://metalsmith-slack.herokuapp.com/) were amazingly helpful!
