# a11yheading

The `a11yheading` plugin was originally based on the `format` plugin.
It updates that plugin with the following modifications:

## Headings

* Promoted to the top of the menu

* Menu items are styled the same to reinforce their use as structural elements

* Menu item labels indicate purpose (e.g. ‘H2 – Section title’)

* Only headings that are in sequence are enabled

* Configuration options

  * New property: `allow_only_one_h1` (true or false)

  * Gaps in list of headings are ignored (`h1;h2;h4` results in h1, h2, h3, h4)

## Paragraph formats

* Normal

* Preformatted text

* Address line

* Normal (DIV)

## Toolbar / Menu

* Menu button label changed to ‘Heading / Paragraph’

* Placed in first position of first row of toolbar

* Checkmark next to menu item indicates current heading or paragraph format (based on cursor position)

* Configuration: same syntax as `format` plugin

* Menu provides a Help menu item
