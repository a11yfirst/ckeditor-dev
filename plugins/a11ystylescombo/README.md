# A11yFirst Character Style

## Description

The A11yFirst Character Style plugin supports authors adding inline character
styling to the text content of a page.  The plugin is intended to be used in
conjunction with the A11yFirst Heading / Paragraph plugin.   The use of these
two plugins together separates "block" format and "inline" styling into two
separate toolbar menus.  Authors benefit from the separation of block format
and inline styling options because the actions of the two menus are more
predictable.   The Character Style plugin replaces the standard Styles Combo
plugin which is more complex for the author to use since it includes both
block format and inline styling options.

NOTE: Visual styling alone should not be used in place of heading or list
markup.

## Features

### Inline Character Styles

The Character Style plugin applies an inline styling element to selected text
or if no text is selected toggles on character style selected until the author
switches to a different style or a new line is inserted to the web page.

The default set of character styles include:

* Strong (`strong`)
* Emphasis (`em`)
* Marker (`marker`)
* Inline quotation (`q`)
* Cited work (`cite`)
* Computer code (`code`)
* Subscript (`sup`)
* Superscript (`sub`)
* Deleted Text (`del`)
* Inserted Text (`ins`)
* Strikethrough (`strike`)
* Underline (`u`),

NOTE: The set of character styles can be customized through configuration
settings and should only contain inline elements.

### Remove Styles

The "Remove Styles" menu option removes the character styling of the text
containing the insert cursor.  If the text containing the insert cursor does
not have any inline styling no action is taken.

### Help

The help command opens the A11yFirst Help plugin option to provide additional
information to the authors to help them understand the accessibility issues
related to using inline styling of text content.

NOTE: The help feature is dependent on the A11yFirst Help plugin being installed.

## Configuration

There is a `stylesSet.add` function that can be used in the `config.js` file to define the set of inline styles available in the Character Style.

Example:
```
// a11ystylescombo configuration
CKEDITOR.stylesSet.add ( 'default', [
  { name: 'Strong',           element: 'strong', overrides: 'b' },
  { name: 'Emphasis',         element: 'em' , overrides: 'i' },
  { name: 'Strikethrough',    element: 'strike' },
  { name: 'Underline',        element: 'u' }
] );
```

## Installation

Download the zip file and extract it to your plugins directory.  Add the following code to your `config.js` file:

```
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
  { name: 'Inserted Text',    element: 'ins' },
  { name: 'Strikethrough',    element: 'strike' },
  { name: 'Underline',        element: 'u' }
] );


config.extraPlugins =
     ...
    'a11ystylescombo,' +
    ...
;
```

'IMPORTANT:' Do not include the standard Styles Combo plugin in the toolbar
configuration when using the A11yFirst Character Style plugin.


## Using the A11yFirst Plugins
The A11yFirst suite of plugins are designed to work together to support
accessible authoring, and we encourage people to use them in the same toolbar.
A [recommended toolbar configuration](https://go.illinois.edu/a11yfirst-config)
is available on the [demonstration page](https://go.illinois.edu/a11yfirst).
The following table show the suite of A11yFirst plugins and the standard plugins
they are designed to replace.

| A11yFirst Plugin | Standard Plugin being Replaced    |
|---  |---  |
| `a11yheadings`    | `format` |
| `a11ystylescombo` | `stylescombobox`   |
| `a11ylink`        | `link`  |
| `a11yimage`       | `image2` or `image`  |
| `a11yfirsthelp`   | none |


