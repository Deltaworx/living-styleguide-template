var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts');

function myLogger(files, metalsmith, done) {
  console.log('Files: ');
  console.log(files);
  console.log('\nMetalsmith: ');
  console.log(metalsmith);
  done();
}

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
