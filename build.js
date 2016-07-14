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

var _collections = {
  assets: { pattern: 'branding/assets/**/*', title: 'Assets BLA' },
  guidelines: { pattern: 'branding/guidelines/**/*' },
  screenshots: { pattern: 'branding/screenshots/**/*' },
  iconography: { pattern: 'components/iconography/**/*' },
  typography: { pattern: 'components/typography/**/*' },
  layout: { pattern: 'components/layout/**/*' },
  'grid-system': { pattern: 'components/grid-system/**/*' },
  navigation: { pattern: 'components/navigation/**/*' },
  tables: { pattern: 'components/tables/**/*' },
  colors: { pattern: 'components/colors/**/*' },
  text: { pattern: 'components/text/**/*' },
  blocks: { pattern: 'components/blocks/**/*' },
  images: { pattern: 'components/images/**/*' },
  tooltips: { pattern: 'components/tooltips/**/*' },
  'form-atomic-elements': { pattern: 'components/forms/atomic-elements/**/*' },
  'form-groups': { pattern: 'components/forms/form-groups/**/*' },
  'form-buttons': { pattern: 'components/forms/buttons/**/*' },
  'form-validation': { pattern: 'components/forms/validation/**/*' },
  'form-patterns': { pattern: 'components/forms/patterns/**/*' },
  dialogs: { pattern: 'components/dialogs/*' },
  feedback: { pattern: 'components/feedback/*' },
  cards: { pattern: 'components/cards/*' },
  'view-patterns': { pattern: 'view-patterns/*' },
  'business-definitions': { pattern: 'business-definitions/*' },
  features: { pattern: 'features/*' },
  'flow-diagrams': { pattern: 'flow-diagrams/*' }
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
