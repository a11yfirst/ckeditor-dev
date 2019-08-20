# A11yFirst Heading / Paragraph

The Heading / Paragaph plugin supports authors adding headings and other block
level paragraph styles into a page. The plugin is intended to be used in
conjunction with the A11yFirst Character Style plugin. The use of these two
plugins together separates "block" and "inline" styling into two separate
toolbar menus. Authors benefit from the separation of block and inline styling
options because the actions of the two menus are more predictable. The
A11yFirst Heading / Paragraph plugin replaces the standard Format plugin which
does not provide information or support for understanding the differences
between using headings and other block level styles.

Important authoring issues for headings:

* Headings serve as labels to describe the content in the following section of
  content on a web page.  This allows screen reader users to quickly and easily
  identify the types of content on the page by reading just the headings, similar
  to how people with sight scan the section heading to identify content they want
  to read or ignore.

* Headings should be used in a hierarchical way to label sections and
  sub-sections of a web page.  When they are used in this way screen reader users
  can better understand the context of `H4` level heading by reading the previous
  `H3` level and `H2` level headings, improving the readability of the web page.

NOTE: Visual styling alone should not be used in place of heading markup.

## Features

### Headings

* Headings are the first items in the menu

* Menu items are styled the same to reinforce their use as structural elements

* Menu item labels indicate purpose (e.g. ‘H2 – Section title’)

* Only headings that are in sequence are enabled

* Configuration options

  * New property: `allow_only_one_h1` (true or false)

  * Gaps in list of headings are ignored (`h1;h2;h4` results in h1, h2, h3, h4)

### Paragraph formats

* Normal

* Preformatted text

* Address line

* Normal (DIV)

### Toolbar / Menu

* Menu button label is ‘Heading / Paragraph’

* Recommend placing in first position of first row of toolbar

* A check mark next to menu item indicates (based on cursor position) the current
  heading level or paragraph format

* Configuration: same syntax as Format plugin

* Menu provides a Help menu item

### Help

The help command opens the A11yFirst Help plugin options to help authors
understand the accessibility issues related to headings and other block level
elements.

NOTE: The help feature is dependent on the A11yFirst Help plugin being installed.

## Installation

Download the zip file and extract it to your plugins directory.  Add the
following code to your `config.js` file:

```
config.extraPlugins =
     ...
    'a11yheading,' +
    ...
;
```

**IMPORTANT:** Do not include the standard `format` plugin in the toolbar
configuration when using the A11yFirst Heading plugin.

## Configuration

There are two main configuration options:

1. Identifying whether the author can include more than one `h1` heading in the
document.

1. The heading levels and the other block level tags available to the author.

```
  // a11yheading configuration
  config.allow_only_one_h1 = true;
  config.format_tags = 'h1;h2;h3;h4;h5;h6;p;pre;address';
```

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

