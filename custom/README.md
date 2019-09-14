# Distribution Build Instructions

To use the CKEditor Builder tool, start by selecting the **Standard** preset.
Then add and remove plugins as specified in the three steps listed below.

**Note #1:** When `filebrowser`, `format`, `link` and `stylescombo` are
removed, their dependencies (`popup`, `listblock`, `fakeobjects` and
`richcombo`) are also removed. Three of these (`fakeobjects`, `listblock`
and `richcombo`) are dependencies for the A11yFirst plugins; hence the need
for Step #3.

**Note #2:** A11yFirst has created its own modified version of Accessibiity
Checker, and our `syncdist.sh` script handles adding its files to our
distribution. But when using CKBuilder to build the foundation for our
distribution, we need to add its dependency, namely the `balloonpanel` plugin.

## Step #1: Add the following 7 plugins

1. Balloon Panel          (`balloonpanel`)
1. Code Snippet           (`codesnippet`)
1. Find / Replace         (`find`)
1. Justify                (`justify`)
1. Language               (`language`)
1. List Style             (`liststyle`)
1. Show Blocks            (`showblocks`)

## Step #2: Remove the following 11 plugins

1. File Browser           (`filebrowser`)
1. Floating Space         (`floatingspace`)
1. Format                 (`format`)
1. Horizontal Rule        (`horizontalrule`)
1. Image                  (`image`)
1. Link                   (`link`)
1. Maximize               (`maximize`)
1. SpellCheckAsYouType    (`scayt`)
1. Styles Combo           (`stylescombo`)
1. Upload Image           (`uploadimage`)
1. WebSpellChecker        (`wsc`)

## Step #3: Add the 3 a11yfirst plugin dependencies

These were removed when the Standard preset plugins `format`, `link` and
`stylescombo` were removed.

1. Fake Objects           (`fakeobjects`)
1. List Block             (`listblock`)
1. Rich Combo             (`richcombo`)

**Historical Note:** To determine which plugins to include in our
distribution, an analysis of the differences between the Basic and Standard
presets was performed. The following are the additional plugins provided by
Standard, our chosen starting point, with comments indicating whether to
include it in the A11yFirst distribution.

| Standard Plugin  | Include |
|------------------|---------|
| `elementspath`   | yes |
| `filebrowser`    | no  |
| `horizontalrule` | no  |
| `htmlwriter`     | yes |
| `magicline`      | yes |
| `maximize`       | no  |
| `popup`          | no  |
| `resize`         | yes |
| `showborders`    | yes |
| `sourcearea`     | yes |
| `tab`            | yes |
| `tableselection` | yes |
| `tabletools`     | yes |
