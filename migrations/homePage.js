const helpers = require( './helpers.js' )

module.exports = function ( migration ) {

  const homePage = migration.createContentType('homePage')
    .name('Home Page');

  helpers.createMetaFields( homePage, 'Company Name' );

}

