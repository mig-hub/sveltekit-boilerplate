const helpers = require( './helpers.js' )

module.exports = function ( migration ) {

  const socialMedia = migration.createContentType('socialMedia')
    .name('Social Media');

  helpers.createSymbolField( socialMedia, 'name', 'Name' )
    .required( true );
  socialMedia.displayField('name');

  helpers.createUriField( socialMedia )
    .required( true );

}
