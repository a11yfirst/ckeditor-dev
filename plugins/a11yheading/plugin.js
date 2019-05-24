/**
* Copyright (c) 2016-2019, University of Illinois - Jon Gunderson and Nicholas Hoyt.
* All rights reserved. For licensing, see LICENSE.md
*
* The 'a11yheading' plugin was based originally on the CKSource 'format' plugin:
*
* @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/

'use strict';

( function () {

  var allowedContent = [],
      allHeadings = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
      allFormats  = [ 'p', 'pre', 'address', 'div' ],
      headingTags = [],
      formatTags  = [],
      startIndex,
      endIndex;

  CKEDITOR.plugins.add( 'a11yheading', {
    requires: 'menubutton',

    // jscs:disable maximumLineLength
    lang: 'en,en-au,en-ca,en-gb', // %REMOVE_LINE_CORE%
    // jscs:enable maximumLineLength

    onLoad: function () {
      CKEDITOR.document.appendStyleSheet( this.path + 'styles/a11yheading.css' );
    },

    init: function ( editor ) {
      // Abort when another plugin with overlapping functionality is to be loaded
      var pluginName = 'a11yheading',
          conflictList = [ 'format' ],
          lang = editor.lang.a11yheading;
      // The detectConflict method was introduced in CKEditor v4.10.1
      // Deactivated the following if statement until further investigation
      if ( false && typeof editor.plugins.detectConflict === 'function' ) {
        if ( editor.plugins.detectConflict( pluginName, conflictList ) ) {
          alert( lang.pluginConflict.replace( '%s', conflictList ) );
          return;
        }
      }

      if ( editor.blockless )
        return;

      // panelShow: injects the CSS rules and properties needed for proper
      // styling of menubuttons, including the checkmark to show selection

      var panelShow = function ( event ) {
        var panel = event.data[ 0 ] || event.data;
        var iframe = panel.element.getElementsByTag( 'iframe' ).getItem( 0 ).getFrameDocument();
        var head = iframe.getElementsByTag( 'head' ).getItem( 0 );
        var cssRules =
          '.cke_menubutton_on .cke_menubutton_icon::after { ' +
            'content: \'✓\'; ' +
            'font-weight: bold; ' +
            'font-size: 110%; ' +
            'position: relative; ' +
            'left: -0.9em; ' +
            'top: .05em; ' +
          '} ' +
          '.cke_menubutton_disabled .cke_menubutton_label { ' +
            'opacity: 0.4; ' +
            'filter: alpha(opacity=40); ' +
          '}';

        if (head.$.querySelectorAll('#a11yheading_menubutton').length === 0) {
          var style = document.createElement( 'style' );;
          style.setAttribute('type', 'text/css');
          style.setAttribute('id', 'a11yheading_menubutton');
          style.innerHTML = cssRules;
          head.$.appendChild(style);
        }
      }
      editor.on( 'panelShow', panelShow );

      // compareVersions: returns -1 when (v1 < v2), 0 when (v1 == v2),
      // 1 when (v1 > v2) or NaN when there exists a part that is NaN

      function compareVersions( v1, v2 ) {
        var v1parts = v1.split( '.' ),
            v2parts = v2.split( '.' );

        // Ensure both arrays are the same length by padding with zeroes
        while ( v1parts.length < v2parts.length ) v1parts.push( '0' );
        while ( v2parts.length < v1parts.length ) v2parts.push( '0' );

        // Convert all of the parts to numbers
        CKEDITOR.tools.array.map( v1parts, Number );
        CKEDITOR.tools.array.map( v2parts, Number );

        function isValidPart( x ) {
          return ( !isNaN( x ) );
        }

        // Return if not all of the parts are valid
        if ( !CKEDITOR.tools.array.every( v1parts, isValidPart ) ||
             !CKEDITOR.tools.array.every( v2parts, isValidPart ) ) {
          return NaN;
        }

        // Do the comparison
        for ( var i = 0; i < v1parts.length; i++ ) {
          if ( v1parts[i] == v2parts[i] ) {
            continue;
          }
          if ( v1parts[i] > v2parts[i] ) {
            return 1;
          }
          else {
            return -1;
          }
        }
        return 0;
      }

      function incompatibleVersionOfButtonPlugin () {
        var minVersion = '4.11';
        return ( compareVersions( CKEDITOR.version, minVersion ) === -1 );
      }

      if ( incompatibleVersionOfButtonPlugin() ) {
        // Load the override script to change behavior of menubutton with text label
        CKEDITOR.scriptLoader.load( this.path + 'js/override.js' );
        console.log( 'Loaded override.js' );
      }

      var config = editor.config,
        lang = editor.lang.a11yheading,
        oneLevel1 = typeof config.allow_only_one_h1 === 'undefined' ? true : config.allow_only_one_h1,
        plugin = this,
        items = {},
        headingTag,
        formatTag;

      // Initialize headingTags array and indices used by getAllowedHeadings
      headingTags = this.getHeadingTags( config );
      startIndex = oneLevel1 && headingTags[0] === 'h1' ? 1 : 0;
      endIndex = headingTags.length - 1;

      // Initialize formatTags array
      formatTags = this.getFormatTags( config );

      // Register heading command
      editor.addCommand( 'heading', {
        allowedContent: allowedContent,
        contextSensitive: true,
        exec: function( editor, itemId ) {
          var item = items[ itemId ];
          if ( item ) {
            editor[ item.style.checkActive( editor.elementPath(), editor ) ? 'removeStyle' : 'applyStyle' ]( item.style );
          }
        },
        refresh: function( editor ) {
          this.setState( plugin.getCurrentHeadingOrFormatElement( editor ) ?
            CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF );
        }
      } );

      // Create item entry for each heading element in config
      for ( var i = 0; i < headingTags.length; i++ ) {
        headingTag = headingTags[ i ];
        items[ headingTag ] = {
          label: lang['level_' + headingTag],
          headingId: headingTag,
          group: 'heading_levels',
          style: new CKEDITOR.style( { element: headingTag } ),
          order: i,
          onClick: function() {
            editor.execCommand( 'heading', this.headingId );
          },
          role: 'menuitemcheckbox'
        };

        // Populate allowedContent array
        allowedContent.push( items[ headingTag ].style );
      }

      // Create item entry for each format element in config
      for ( var i = 0; i < formatTags.length; i++ ) {
        formatTag = formatTags[ i ];
        items[ formatTag ] = {
          label: lang['format_' + formatTag],
          formatId: formatTag,
          group: 'block_formats',
          style: new CKEDITOR.style( { element: formatTag } ),
          order: headingTags.length + i,
          onClick: function() {
            editor.execCommand( 'heading', this.formatId );
          },
          role: 'menuitemcheckbox'
        };

        // Populate allowedContent array
        allowedContent.push( items[ formatTag ].style );
      }

      // Add Help item using command from a11yfirsthelp plugin
      items.headingHelp = {
        label: lang.helpLabel,
        group: 'help_items',
        order: headingTags.length + formatTags.length + 1,
        onClick: function() {
          var helpPlugin = CKEDITOR.plugins.get( 'a11yfirsthelp' );
          if (helpPlugin) {
            editor.a11yfirst.helpOption = 'HeadingHelp';
            editor.execCommand('a11yFirstHelpDialog');
          }
          else {
            alert(lang.helpNotFound)
          }
        }
      };

      // Initialize menu groups
      editor.addMenuGroup( 'heading_levels', 1 );
      editor.addMenuGroup( 'block_formats', 2 );
      editor.addMenuGroup( 'help_items' );
      editor.addMenuItems( items );

      editor.ui.add( 'Heading', CKEDITOR.UI_MENUBUTTON, {
        label: lang.label,
        title: lang.panelTitle,
        allowedContent: allowedContent,
        toolbar: 'heading',
        command: 'heading',
        onMenu: function() {
          var activeItems = {},
            allowedHeadings = plugin.getAllowedHeadings( editor ),
            currentHeadingOrFormatElement = plugin.getCurrentHeadingOrFormatElement( editor );

          for ( var prop in items ) {
            if ( plugin.isHeadingElement( prop ) ) {
              activeItems[ prop ] = allowedHeadings.indexOf( prop ) == -1 ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF;
            }
            else {
              activeItems[ prop ] = CKEDITOR.TRISTATE_OFF;
            }
          }

          activeItems.headingHelp = CKEDITOR.TRISTATE_OFF;

          if ( currentHeadingOrFormatElement )
            activeItems[ currentHeadingOrFormatElement.getName() ] = CKEDITOR.TRISTATE_ON;

          return activeItems;
        }
      } );
    },

    isHeadingElement: function ( name ) {
      return ( allHeadings.indexOf( name ) >= 0 );
    },

    isFormatElement: function ( name ) {
      return ( allFormats.indexOf( name ) >= 0 );
    },

    isHeadingOrFormatElement: function ( name ) {
      return this.isHeadingElement( name ) || this.isFormatElement( name );
    },

    getCurrentHeadingOrFormatElement: function ( editor ) {
      var elementPath = editor.elementPath(),
          activePath = elementPath && elementPath.elements,
          pathMember, element;

      // IE8: Upon initialization if there is no path, elementPath() returns null.
      if ( elementPath ) {
        for ( var i = 0; i < activePath.length; i++ ) {
          pathMember = activePath[ i ];
          if ( !element && this.isHeadingOrFormatElement( pathMember.getName() ) )
            element = pathMember;
        }
      }

      return element;
    },

    getHeadingTags: function ( config ) {
      // This condition should not occur as long as this file contains a definition
      if (typeof config.format_tags !== 'string' || config.format_tags.length === 0 ) {
        return allHeadings.slice();
      }

      var headings = [], beginIndex, endIndex;

      var configTags = config.format_tags.split( ';' );
      for ( var i = 0; i < configTags.length; i++ ) {
        configTags[ i ] = configTags[ i ].toLowerCase();
      }

      // Use the allHeadings array to preserve the desired order and prevent duplicates
      for ( var i = 0; i < allHeadings.length; i++ ) {
        var tag = allHeadings[ i ];
        if ( configTags.indexOf( tag ) >= 0 ) {
          headings.push( tag );
        }
      }

      // Handle three cases: empty array; only one item; multiple items
      switch ( headings.length ) {
        case 0:
          // If no heading tags in config, default to all tags
          return allHeadings.slice();
        case 1:
          // Allow config to specify only one heading tag
          return headings;
        default:
          // Do not allow gaps within the range of headings
          beginIndex = allHeadings.indexOf( headings[ 0 ] );
          endIndex   = allHeadings.indexOf( headings[ headings.length - 1 ] ) + 1;
          return allHeadings.slice( beginIndex, endIndex );
      }
    },

    getFormatTags: function ( config ) {
      // This condition should not occur as long as this file contains a definition
      if (typeof config.format_tags !== 'string' || config.format_tags.length === 0 ) {
        return allFormats.slice();
      }

      var formats = [];

      var configTags = config.format_tags.split( ';' );
      for ( var i = 0; i < configTags.length; i++ ) {
        configTags[ i ] = configTags[ i ].toLowerCase();
      }

      // Use the allFormats array to preserve the desired order and prevent duplicates
      for ( var i = 0; i < allFormats.length; i++ ) {
        var tag = allFormats[ i ];
        if ( configTags.indexOf( tag ) >= 0 ) {
          formats.push( tag );
        }
      }

      // If no paragraph format tags were specified in config, default to basic set
      if ( formats.length == 0 ) return allFormats.slice( 0, 3 );

      return formats;
    },

    /*
    *   getAllowedHeadings: Returns an array of heading tags that represents
    *   the heading levels that are in sequence at the selectedElement point
    *   in the document, based on the previous and next headings already in
    *   the document, if they exist.
    */
    getAllowedHeadings: function ( editor ) {
      var selectedElement = editor.getSelection().getStartElement();
      // console.log('SELECTED ELEMENT: ' + selectedElement.getName() );

      var prevHeading = null,
          nextHeading = null,
          foundSelectedElement = false,
          plugin = this,
          allowedHeadings,
          indexPrev,
          indexNext;

      /*
      *   getPrevHeading: Recursively traverses elements in document. Each
      *   time a heading element is found, sets var 'prevHeading' (in outer
      *   scope) to the heading tag name. Returns when 'selectedElement' or
      *   end of document is reached.
      */
      function getPrevHeading ( element ) {
        if ( typeof element.getName !== 'function' )
          return false;

        if ( element.equals( selectedElement ) )
          return true;

        var tagName = element.getName();

        if ( plugin.isHeadingElement( tagName ) )
          prevHeading = tagName;

        var children = element.getChildren();
        var count = children.count();

        for ( var i = 0; i < count; i++ ) {
          if ( getPrevHeading( children.getItem( i ) ) )
            return true;
        }
        return false;

      } // end function

      /*
      *   getNextHeading: Recursively traverses elements in document. When
      *   'selectedElement' is reached, sets var 'foundSelectedElement' (in
      *   outer scope) to true. Returns when 'foundSelectedElement' is true
      *   AND a heading element is found (after setting var 'nextHeading' in
      *   outer scope to the heading tag name) or when end of document is
      *   reached.
      *
      */
      function getNextHeading ( element ) {
        if ( typeof element.getName !== 'function' )
          return false;

        if ( element.equals( selectedElement ) )
          foundSelectedElement = true;

        var tagName = element.getName();

        if ( foundSelectedElement && plugin.isHeadingElement( tagName ) ) {
          nextHeading = tagName;
          return true;
        }

        var children = element.getChildren();
        var count = children.count();

        for ( var i = 0; i < count; i++ ) {
          if ( getNextHeading( children.getItem( i ) ) )
            return true;
        }
        return false;

      } // end function

      getPrevHeading( editor.document.getBody() );
      console.log( 'PREV HEADING: ' + prevHeading );

      getNextHeading( editor.document.getBody() );
      console.log( 'NEXT HEADING: ' + nextHeading );

      // If there is no previous heading, return an array with one element:
      // the first (i.e. highest-level) heading in headingTags
      if ( prevHeading === null ) {
        return headingTags.slice( 0, 1 );
      }

      // There is a previous heading, so get its headingTags index
      var indexPrev = headingTags.indexOf( prevHeading );

      if ( indexPrev >= 0 ) {
        if ( nextHeading === null ) {
          // We don't have to worry about look-ahead issues...
          // The allowed headings includes all heading levels higher than
          // indexPrev, through and including the heading one level lower.

          // Note that if (indexPrev + 2) is greater than the last index
          // in headingTags, the slice fn. will interpret this to mean that
          // the endpoint is the last item in the array.
          allowedHeadings = headingTags.slice( startIndex, indexPrev + 2 );
        }
        else {
          // There is a next heading, so deal with having both a previous
          // and a next heading. There are three cases for how their indices
          // compare to each other numerically, when indexNext is valid.
          indexNext = headingTags.indexOf( nextHeading );
          if ( indexNext >= 0 ) {
            if ( indexPrev < indexNext ) {
              // Only allow indexPrev and (indexPrev + 1) (exclude one level up)
              // allowedHeadings = headingTags.slice( Math.max( startIndex, indexPrev ), indexPrev + 2 );

              // Allow indexPrev through indexNext; exclude levels above indexPrev
              // (This is less restrictive than the previous line of code.)
              allowedHeadings = headingTags.slice( Math.max( startIndex, indexPrev ), indexNext + 1 );
            }
            if ( indexPrev === indexNext ) {
              // Only allow one level up, same level, or one level down
              allowedHeadings = headingTags.slice( Math.max( startIndex, indexPrev - 1 ), indexPrev + 2 );
            }
            if ( indexPrev > indexNext ) {
              allowedHeadings = headingTags.slice( Math.max( startIndex, indexNext - 1 ), indexPrev + 2 );
            }
          }
          else {
            // nextHeading is not in headingTags array: treat as if (nextHeading === null) ???
            allowedHeadings = headingTags.slice( startIndex, indexPrev + 2 );
          }
        }
        return allowedHeadings;
      }

      // prevHeading not in headingTags array => lexical comparison
      if ( prevHeading < headingTags[ 0 ] )
        return headingTags.slice( startIndex, startIndex + 1 );

      if ( prevHeading > headingTags[ endIndex ] )
        return headingTags.slice( startIndex );

    } // end method getAllowedHeadings

  } )
} )();

CKEDITOR.config.format_tags = 'h1;h2;h3;h4;h5;h6;p;pre;address;div';
