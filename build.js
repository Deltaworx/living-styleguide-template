var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
    date        = require('metalsmith-build-date'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    metadata    = require('metalsmith-metadata'),
    assets      = require('metalsmith-assets'),
    autotoc     = require('metalsmith-autotoc'),
    watch       = require('metalsmith-watch'),
    msIf        = require('metalsmith-if'),
    Handlebars  = require('handlebars'),
    helpers     = require('handlebars-helpers');

function myLogger(files, metalsmith, done) {
  console.log('Processing files... ');
  for(var file in files) {
    console.log(file);
  }
  done();
}

function setAutoToc(files, metalsmith, done) {
  for(var file in files) {
    files[file]['autotoc'] = true;
  }
  done();
}

function watchModeEnabled() {
  return process.argv[2] === '--watch';
}

function registerHandlebarsHelpers(files, metalsmith, done) {
  for(var file in files) {
    Handlebars.registerHelper('comparison', helpers.comparison())
  }
  done();
}

var _collections = {
  branding: { pattern: 'branding/**/*', title: 'Branding' },
  components: { pattern: 'components/**/*', title: 'Components' },
  'view-patterns': { pattern: 'view-patterns/**/*', title: 'View patterns' },
  'business-definitions': { pattern: 'business-definitions/**/*', title: 'Business definitions' },
  features: { pattern: 'features/**/*', title: 'Features' },
  'flow-diagrams': { pattern: 'flow-diagrams/**/*', title: 'Flow diagrams' }
};

function setCollectionInfoForMenu(files, metalsmith, done) {
  for(var file in files) {
    files[file]['collectionInfo'] = _collections;
  }
  done();
}

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(msIf(watchModeEnabled(), watch({paths: {"src/**/*": true, "layouts/**/*": "**/*.md"}})))
  .use(metadata({ config: 'config.yml'})) // relative to build directory
  .use(assets({
    source: './assets',                   // relative to working directory
    destination: './assets'               // relative to build directory
  }))
  .use(registerHandlebarsHelpers)
  .use(date())
  .use(markdown())
  .use(setCollectionInfoForMenu)
  .use(collections(_collections))
  .use(setAutoToc)
  .use(autotoc({selector: 'h2, h3, h4'}))
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
