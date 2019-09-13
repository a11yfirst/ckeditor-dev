/**
* Copyright (c) 2018 University of Illinois - Jon Gunderson and Nicholas Hoyt. All rights reserved.
* For licensing, see LICENSE.md or http://ckeditor.com/license
*
* BUILD INSTRUCTIONS FOR CKBUILDER TO ADD A11YFIRST PLUGINS
*
* To use the CKEditor Builder tool, start by selecting the Standard preset.
* Then add and remove plugins as specified in the two steps listed below.
*
* 1. Add the following 12 plugins:
*
*    A11yFirst Character Style      (a11ystylescombo)
*    A11yFirst Heading / Paragraph  (a11yheading)
*    A11yFirst Help                 (a11yfirsthelp)
*    A11yFirst Image                (a11yimage)
*    A11yFirst Link                 (a11ylink)
*    Accessibility Checker          (a11ychecker)
*    Code Snippet                   (codesnippet)
*    Find / Replace                 (find)
*    Justify                        (justify)
*    Language                       (language)
*    List Style                     (liststyle)
*    Show Blocks                    (showblocks)
*
* 2. Remove the following 11 plugins:
*
*    File Browser           (filebrowser)
*    Floating Space         (floatingspace)
*    Format                 (format)
*    Horizontal Rule        (horizontalrule)
*    Image                  (image)
*    Link                   (link)
*    Maximize               (maximize)
*    SpellCheckAsYouType    (scayt)
*    Styles Combo           (stylescombo)
*    Upload Image           (uploadimage)
*    WebSpellChecker        (wsc)
*
* SUGGESTED CONFIGURATION FOR USING A11YFIRST PLUGINS
*/

CKEDITOR.editorConfig = function ( config ) {
  config.height = 480;
  config.skin = 'moono-lisa';
  config.startupFocus = true;

  // a11yheading configuration
  config.allow_only_one_h1 = true;
  config.format_tags = 'h1;h2;h3;h4;p;pre;address';

  config.plugins =
    'a11ychecker,' +
    'a11yfirsthelp,' +
    'a11yheading,' +
    'a11yhelp,' +
    'a11yimage,' +
    'a11ylink,' +
    'a11ystylescombo,' +
    'about,' +
    'balloonpanel,' +
    'basicstyles,' +
    'blockquote,' +
    'clipboard,' +
    'codesnippet,' +
    'contextmenu,' +
    'elementspath,' +
    'enterkey,' +
    'entities,' +
    'find,' +
    'htmlwriter,' +
    'indentlist,' +
    'justify,' +
    'language,' +
    'list,' +
    'liststyle,' +
    'magicline,' +
    'pastefromword,' +
    'pastetext,' +
    'removeformat,' +
    'resize,' +
    'showblocks,' +
    'showborders,' +
    'sourcearea,' +
    'specialchar,' +
    'tab,' +
    'table,' +
    'tableselection,' +
    'tabletools,' +
    'toolbar,' +
    'undo,' +
    'wysiwygarea';

  config.language_list = [
    'ar:Arabic:rtl',
    'zh:Chinese',
    'cs:Czech',
    'da:Danish',
    'nl:Dutch',
    'fi:Finnish',
    'fr:French',
    'gd:Gaelic',
    'de:German',
    'el:Greek',
    'he:Hebrew:rtl',
    'hi:Hindi',
    'hu:Hungarian',
    'id:Indonesian',
    'it:Italian',
    'ja:Japanese',
    'ko:Korean',
    'la:Latin',
    'no:Norwegian',
    'fa:Persian:rtl',
    'pl:Polish',
    'pt:Portuguese',
    'ru:Russian',
    'es:Spanish',
    'sv:Swedish',
    'th:Thai',
    'tr:Turkish',
    'vi:Vietnamese',
    'yi:Yiddish'
  ];

  config.toolbar = [
    { name: 'heading',        items: [ 'Heading' ] },
    { name: 'list',           items: [ 'NumberedList', 'BulletedList', 'Indent', 'Outdent' ] },
    { name: 'otherblocks',    items: [ 'Blockquote', 'CodeSnippet' ] },
    { name: 'justify',        items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ] },
    { name: 'misc1',          items: [ 'Image', 'Table' ] },
    { name: 'showblocks',     items: [ 'ShowBlocks' ] },
    { name: 'a11yfirsthelp',  items: [ 'A11yFirstHelp' ] },
//  { name: 'source',         items: [ 'Source' ] },
    '/',
    { name: 'undoredo',       items: [ 'Undo', 'Redo' ] },
    { name: 'clipboard',      items: [ 'Cut', 'Copy', 'Paste', 'PasteFromWord' ] },
    { name: 'search',         items: [ 'Find', 'Replace' ] },
    { name: 'basicstyles',    items: [ 'Bold', 'Italic' ] },
    { name: 'inlinestyle',    items: [ 'InlineStyle' ] },
    { name: 'removeformat',   items: [ 'RemoveFormat' ] },
    { name: 'link',           items: [ 'Link', 'Unlink', 'Anchor' ] },
    { name: 'misc2',          items: [ 'Language', 'SpecialChar' ] },
    { name: 'a11ychecker',    items: [ 'A11ychecker' ] }
  ];

};

// a11ystylescombo configuration
CKEDITOR.stylesSet.add ( 'default', [
  { name: 'Strong',           element: 'strong', overrides: 'b' },
  { name: 'Emphasis',         element: 'em' , overrides: 'i' },
  { name: 'Marker',           element: 'span', attributes: { 'class': 'marker' } },
  { name: 'Inline quotation', element: 'q' },
  { name: 'Cited work',       element: 'cite' },
  { name: 'Computer code',    element: 'code' },
  { name: 'Subscript',        element: 'sub' },
  { name: 'Superscript',      element: 'sup' },
  { name: 'Deleted Text',     element: 'del' },
  { name: 'Inserted Text',    element: 'ins' }
] );
