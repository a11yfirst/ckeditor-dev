/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'blockformatHelp', function( editor ) {
  var lang = editor.lang.blockformat;

  return {
    title: lang.helpLabel,
    minWidth: 500,
    minHeight: 300,
    onShow: function(event) {

      function h2(content) {
        return '<h2 style="white-space: normal; font-weight: bold; margin-top: 0em; font-size: 135%">' + content + '</h2>';
      }

      function list(tag, list) {
        var html = '<' + tag + ' style="margin-top: 0.5em; padding-left: 1em;">';
        for (let i = 0; i < list.length; i++) {
          html += '<li style="white-space: normal; padding-bottom: 0.5em; font-size: 110%">' + list[i] + '</li>';
        }
        html += '</' + tag + '>';
        return html;
      }

      var node, html;

      node = document.getElementById('tab_block');
      html = h2(lang.helpBlockTitle);
      html += list('ul', lang.helpBlockItems);
      node.innerHTML = html;

      node = document.getElementById('tab_inline');
      html = h2(lang.helpInlineTitle);
      html += list('ul', lang.helpInlineItems);
      node.innerHTML = html;

      node = document.getElementById('tab_heading');
      html = h2(lang.helpHeadingTitle);
      html += list('ul', lang.helpHeadingItems);
      node.innerHTML = html;

    },

    contents: [
      {
        id: 'tab1',
        label: lang.helpBlockLabel,
        title: lang.helpBlockTitle,
        expand: true,
        padding: 0,
        elements: [
          {
            type: 'html',
            html: '<div><div id="tab_block"></div></div>'
          }
        ]
      },
      {
        id: 'tab2',
        label: lang.helpInlineLabel,
        title: lang.helpInlineTitle,
        expand: true,
        padding: 0,
        elements: [
          {
            type: 'html',
            html: '<div><div id="tab_inline"></div></div>'
          }
        ]
      },
      {
        id: 'tab3',
        label: lang.helpHeadingLabel,
        title: lang.helpHeadingTitle,
        expand: true,
        padding: 0,
        elements: [
          {
            type: 'html',
            html: '<div><div id="tab_heading"></div></div>'
          }
        ]
      }
    ],

    buttons: [ CKEDITOR.dialog.okButton ]
  };
} );
