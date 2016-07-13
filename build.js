var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
    date        = require('metalsmith-build-date'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    metadata    = require('metalsmith-metadata'),
    assets      = require('metalsmith-assets');

function myLogger(files, metalsmith, done) {
  //console.log('Processing files... ');
  //for(var file in files) {
  //console.log(file);
  //  }
  console.log('-----');
  console.log(_collections);
  console.log('-----');
  done();
}

/*
function readCollections(files, metalsmith, done) {
  _collections = metalsmith.metadata().config.collections;
  console.log(_collections);
  done();
}
*/

var _collections = {
  assets: { pattern: 'branding/assets/**/*' }
};

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(metadata({ config: 'config.yml'})) // relative to build directory
  .use(assets({
    source: './assets',                   // relative to working directory
    destination: './assets'               // relative to build directory
  }))
  .use(date())
  .use(markdown())
  .use(collections(_collections))
  .use(permalinks({
    pattern: ':collections/:title'
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'layouts',
    partials: 'layouts/partials'
  }))
  .build(function(err) {
    if(err) throw err;
    console.log('Build finished');
  });
