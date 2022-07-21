module.exports = {

  createSymbolField( contentType, fieldId = 'title', fieldName = 'Title', control = {} ) {

    let field = contentType.createField( fieldId )
      .type('Symbol')
      .name( fieldName );
    contentType.changeFieldControl( fieldId, 'builtin', 'singleLine', {
      ...control,
    });

    return field;
  },

  createSlugField( contentType, fieldId = 'slug', fieldName = 'Slug', control = {} ) {

    let field = contentType.createField( fieldId )
      // not isUnique() validation because it is not always required.
      .type('Symbol')
      .required( true )
      .name( fieldName );
    contentType.changeFieldControl( fieldId, 'builtin', 'slugEditor', {
      helpText: "Used in the URL. Only change this if necessary.",
      ...control,
    });

    return field;
  },

  createTextField( contentType, fieldId = 'text', fieldName = 'Text', control = {} ) {

    let field = contentType.createField( fieldId )
      .type('Text')
      .name( fieldName );
    contentType.changeFieldControl( fieldId, 'builtin', 'multipleLine', {
      ...control,
    });

    return field;
  },

  createLocationField( contentType, fieldId = 'coordinates', fieldName = 'Coordinates', control = {} ) {
    let field = contentType.createField( fieldId )
      .type('Location')
      .name( fieldName );
    contentType.changeFieldControl( fieldId, 'builtin', 'locationEditor', {
      ...control,
    });

    return field;
  },

  createTimeField( contentType, fieldId, fieldName, control = {} ) {

    let field = this.createSymbolField( contentType, fieldId, fieldName, {
      helpText: "24h Time e.g. 8:00 or 16:30",
      ...control,
    })
      .defaultValue({
        'en-US': '12:00',
      })
      .validations([
        this.regexpTime24(),
      ]);

    return field;

  },

  createEmailField( contentType, fieldId = 'email', fieldName = 'Email', control = {} ) {

    let field = this.createSymbolField( contentType, fieldId, fieldName, {
      ...control,
    })
      .validations([
        this.regexpEmail(),
      ]);

    return field;

  },

  createUriField( contentType, fieldId = 'uri', fieldName = 'Uri', control = {} ) {

    let field = this.createSymbolField( contentType, fieldId, fieldName, {
      ...control,
    });
      // Commented out because the regex prevent root relative paths and some schemes like mailto.
      // .validations([
      //   this.regexpUri(),
      // ]);

    return field;

  },

  createImageArrayField( contentType, fieldId = 'images', fieldName = 'Images', control = {} ) {

    let field = contentType.createField(fieldId)
      .type('Array')
      .items({
        "type": "Link",
        "validations": [
          this.isImage(),
          this.isBelow1MB(),
        ],
        "linkType": "Asset",
      })
      .name( fieldName );

    contentType.changeFieldControl( fieldId, 'builtin', 'assetGalleryEditor', {
      ...control,
    });

    return field;
  },

  createEntryField( contentType, fieldId, fieldName, acceptedTypes, control = {} ) {
    let field = contentType.createField(fieldId)
      .type('Link')
      .validations([
        this.isAcceptedContentType( acceptedTypes ),
      ])
      .linkType('Entry')
      .name( fieldName );

    contentType.changeFieldControl( fieldId, 'builtin', 'entryLinkEditor', {
      ...control,
    });

    return field;
  },

  createEntryArrayField( contentType, fieldId, fieldName, acceptedTypes, control = {} ) {

    // acceptedTypes can be an array or a single contentType name

    let field = contentType.createField(fieldId)
      .type('Array')
      .items({
        "type": "Link",
        "validations": [
          this.isAcceptedContentType( acceptedTypes ),
        ],
        "linkType": "Entry",
      })
      .name( fieldName );

    contentType.changeFieldControl( fieldId, 'builtin', 'entryLinksEditor', {
      bulkEditing: true,
      showLinkEntityAction: false,
      showCreateEntityAction: true,
      ...control,
    });

    return field;
  },

  createPdfField( contentType, fieldId = 'pdf', fieldName = 'PDF', control = {} ) {
    let field = contentType.createField(fieldId)
      .type('Link')
      .validations([
        this.isPDF(),
      ])
      .linkType('Asset')
      .name( fieldName );

    contentType.changeFieldControl( fieldId, 'builtin', 'assetLinkEditor', {
      ...control,
    });

    return field;
  },

  createImageField( contentType, fieldId = 'image', fieldName = 'Image', control = {} ) {
    let field = contentType.createField(fieldId)
      .type('Link')
      .validations([
        this.isImage(),
        this.isBelow1MB(),
      ])
      .linkType('Asset')
      .name( fieldName );

    contentType.changeFieldControl( fieldId, 'builtin', 'assetLinkEditor', {
      ...control,
    });

    return field;
  },

  createMetaFields( page, defaultMetaTitle ) {

    this.createSymbolField( page, 'metaTitle', 'Meta Title', {
      helpText: "For SEO only."
    })
      .required(true)
      .defaultValue({
        'en-US': defaultMetaTitle,
      });
    page.displayField('metaTitle');

    this.createTextField( page, 'metaDescription', 'Meta Description', {
      helpText: "For SEO only."
    })
      .required( true );

  },

  isUnique() {
    return {
      "unique": true,
    }
  },

  isImage() {
    return {
      "linkMimetypeGroup": [
        "image",
      ],
    }
  },

  isPDF() {
    return {
      "linkMimetypeGroup": [
        "pdfdocument",
      ],
    }
  },

  isBelow1MB() {
    return {
      "assetFileSize": {
        "min": null,
        "max": 1048576,
      },
    }
  },

  isAcceptedContentType( acceptedTypes ) {
    // acceptedTypes can be an array or a single type
    return {
      "linkContentType": (acceptedTypes instanceof Array ? acceptedTypes : [acceptedTypes]),
    }
  },

  regexpUri() {
    return {
      regexp: {
        pattern: "^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?",
      },
    }
  },

  regexpEmail() {
    return {
      regexp: {
        pattern: "^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$",
      },
    }
  },

  regexpTime12() {
    return {
      regexp: {
        pattern: "^(0?[1-9]|1[012]):[0-5][0-9](:[0-5][0-9])?\\s*[aApP][mM]$",
      },
    }
  },

  regexpTime24() {
    return {
      regexp: {
        pattern: "^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$",
      },
    }
  },

  // Helpers specific to this website

  createSectionsField( contentType ) {
    this.createEntryArrayField( contentType, 'sections', 'Editorial Sections', [
      // insert editorial sections names e.g.
      // 'textSection',
    ]);
  },

}
