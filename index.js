var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
    date        = require('metalsmith-build-date'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    metadata    = require('metalsmith-metadata');

function myLogger(files, metalsmith, done) {
  console.log('Processing files... ');
  for(var file in files) {
    console.log(file);
  }
  done();
}

Metalsmith(__dirname)
  .destination('./build')
  .use(date())
  .use(markdown())
  .use(metadata({ config: 'config.yml'}))
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
  .build(function(err) {
    if(err) throw err;
    console.log('Build finished');
  });
