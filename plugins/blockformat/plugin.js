/**
* @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
* For licensing, see LICENSE.md or http://ckeditor.com/license
*/


// Block Snippet support resources
(function () {

  var blockSnippets = {},
    loadedBlockSnippetsFiles = {};

  CKEDITOR.addBlockSnippets = function( name, definition ) {
    blockSnippets[ name ] = definition;
  };

  CKEDITOR.getBlockSnippets = function( name ) {
    return blockSnippets[ name ];
  };

  CKEDITOR.loadBlockSnippets = function( blockSnippetsFiles, callback ) {
    // Holds the templates files to be loaded.
    var toLoad = [];

    // Look for pending template files to get loaded.
    for ( var i = 0, count = blockSnippetsFiles.length; i < count; i++ ) {
      if ( !loadedBlockSnippetsFiles[ blockSnippetsFiles[ i ] ] ) {
        toLoad.push( blockSnippetsFiles[ i ] );
        loadedBlockSnippetsFiles[ blockSnippetsFiles[ i ] ] = 1;
      }
    }

    if ( toLoad.length )
      CKEDITOR.scriptLoader.load( toLoad, callback );
    else
      setTimeout( callback, 0 );
  }; 


})();


/**
 * The block snippet definition set to use. It accepts a list of names separated by
 * comma. It must match definitions loaded with the {@link #blocksnippet_files} setting.
 *
 *    config.templates = 'my_templates';
 *
 * @cfg {String} [templates='default']
 * @member CKEDITOR.config
 */

CKEDITOR.config.blocksnippets = 'default,library';


/**
 * The list of block snippet definition files to load.
 *
 *    config.blocksnippet_files = [
 *      '/editor_block/site_default.js',
 *      'http://www.example.com/user_templates.js'
 *    ];
 *
 * For an block snippet template file
 * [see `blocksnippets/default.js`](https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/blockformat/blocksnippets/default.js).
 *
 * @cfg {String[]}
 * @member CKEDITOR.config
 */
CKEDITOR.config.blocksnippet_files = [
  CKEDITOR.getUrl( 'plugins/blockformat/blocksnippets/default.js' ),
  CKEDITOR.getUrl( 'plugins/blockformat/blocksnippets/library.js' )
];


CKEDITOR.loadBlockSnippets(CKEDITOR.config.blocksnippet_files, function() {
  // nothing to do right now
})


CKEDITOR.plugins.add( 'blockformat', {
  requires: 'a11yfirst,blockquote,codesnippet,menubutton',

  // jscs:disable maximumLineLength
  lang: 'en,en-au,en-ca,en-gb', // %REMOVE_LINE_CORE%
  // jscs:enable maximumLineLength

  init: function( editor ) {
    if ( editor.blockless )
      return;

    var config = editor.config,
        lang = editor.lang.blockformat,
        items = {},
        menu_order = 0
        menu_groups  = [];
   
    // Menuitem commands
    var blockquoteCmd = 'blockquote';
    var codesnippetCmd = 'codeSnippet';

    // Change behavior of menubutton with text label
    CKEDITOR.plugins.get( 'a11yfirst' ).overrideButtonSetState();

    menu_groups.push('blockformatMain');

    items.blockquote = {
      label: lang.blockquoteLabel,
      group: 'blockformatMain',
      order: menu_order++,
      onClick: function () {
        editor.execCommand( blockquoteCmd );
      }
    };

    items.codesnippet = {
      label: lang.codesnippetLabel,
      group: 'blockformatMain',
      order: menu_order++,
      onClick: function () {
        editor.execCommand( codesnippetCmd );
      }
    };

    // Add Block Snippets

    // Register blockSnippet command
    editor.addCommand( 'blockformatSnippet', {
      exec: function( editor, blockSnippetId ) {
        var item = items[ blockSnippetId ];
        if ( item ) {
          editor.insertHtml(item.html);
        }
      },
    });

    // Create item entry for each block snippet in config


    var allBlockSnippets = ( config.blocksnippets || 'default' ).split( ',' );
    var blockSnippetIds = [];

    for (var i = 0; i < allBlockSnippets.length; i++) {

      var blockSnippets = CKEDITOR.getBlockSnippets(allBlockSnippets[i]).blockSnippets;

      for (var j = 0; j < blockSnippets.length; j++) {
        var blockSnippet = blockSnippets[j]; 
        blockSnippetIds.push(blockSnippet.id);       
        
        items[ blockSnippet.id ] = {
          label: blockSnippet.label,
          blockSnippetId: blockSnippet.id,
          html: blockSnippet.html,
          group: blockSnippet.group ? blockSnippet.group : 'blockformatSnippet',
          order: menu_order++,
          onClick: function() {
            editor.execCommand( 'blockformatSnippet', this.blockSnippetId );
          },
        };

        if (blockSnippet.group) {
          if (!menu_groups.includes(blockSnippet.group)) {
            menu_groups.push(blockSnippet.group);
          }
        }
        else {
          if (!menu_groups.includes('blockformatSnippet')) {
            menu_groups.push('blockformatSnippet');
          }          
        }  
      }
    }


    // Add Help item

    // Initialize help menuitem
    var helpCmd = 'blockformatHelp';
    CKEDITOR.dialog.add( helpCmd, this.path + 'dialog/blockformat_help.js' );
    editor.addCommand( helpCmd, new CKEDITOR.dialogCommand( helpCmd ) );
    
    items.blockformatHelp = {
      label: lang.helpLabel,
      group: 'blockformatHelp',
      order: menu_order++,
      onClick: function() {
        editor.execCommand( helpCmd );
      }
    };

    // Initialize menu groups
    for(var i=0; i < menu_groups.length; i++) {
      editor.addMenuGroup( menu_groups[i], (i+1) );
    }

    // editor.addMenuGroup( 'other' );
    editor.addMenuItems( items );

    editor.ui.add( 'BlockFormat', CKEDITOR.UI_MENUBUTTON, {
      label: lang.label,
      toolbar: 'blockformat',
      allowedContent: 'blockquote; pre; code(language-*)',
      onMenu: function() {
        var activeItems = {};
        activeItems.blockquote      = CKEDITOR.TRISTATE_OFF;
        activeItems.codesnippet     = CKEDITOR.TRISTATE_OFF;
        
        for (var i = 0; i < blockSnippetIds.length; i++) {
          activeItems[blockSnippetIds[i]] = CKEDITOR.TRISTATE_OFF;
        }        
        
        activeItems.blockformatHelp = CKEDITOR.TRISTATE_OFF;
        return activeItems;
      }
    } ); // END ui.add

  } // END init

} );





