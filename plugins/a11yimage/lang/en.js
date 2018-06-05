/*
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang( 'a11yimage', 'en', {
	alt: 'Text Alternative (short description)',
	btnUpload: 'Send it to the Server',
	captioned: 'Add an editable caption below the image',
	captionedHelp: 'Adds an editable textbox below the image with placeholder text \'Caption\'',
	msgCaption: 'Edit the caption in the textbox just below the image',
	captionPlaceholder: 'Caption',
	infoTab: 'Image Info',
	lockRatio: 'Lock Ratio',
	menu: 'Image Properties',
	pathName: 'image',
	pathNameCaption: 'caption',
	resetSize: 'Reset Size',
	resizer: 'Click and drag to resize',
	title: 'Image Properties',
	uploadTab: 'Upload',
	urlMissing: 'Please type the URL for the image',
	// Additional properties used in a11yimag
	typeOfImage: 'Type of Image',
	typeSimple: 'Simple',
	typeSimpleHelp: 'Requires a short text description',
	typeComplex:'Complex',
	typeComplexHelp:'Requires both short and long text descriptions',
	typeDecorative: 'Decorative',
	typeDecorativeHelp: 'Adds no additional information to the document',
	typeOfImage: 'Type of Image',
	hasDescription: 'Document includes long description',
	imageDesc: 'Accessible Description',
	captionContent: 'Caption Text',
	a11yfirstInfo: 'Info',
	a11yfirstInfoHelp: 'Learn about accessible images',
	descriptionLocation: 'Location of long description',
	locationBefore: 'Before',
	locationBeforeHelp: 'Before the image',
	locationBeforeTitle: 'Long description is located just before the image',
	locationAfter:  'After',
	locationAfterHelp:  'After the image',
	locationAfterTitle: 'Long description is located just after the image',
	locationBoth:   'Before &amp; After',
	locationBothHelp:   'Both before and after the image',
	locationBothTitle: 'Long description is located just before and after the image',
	alignNone: 'None',
	alignLeft: 'Left',
	alignCenter: 'Center',
	alignRight: 'Right',
	alternativeTextMaxLength: 100,
	altContainsFilename: ['.tif', '.tiff','.gif','.jpeg', '.jpg', '.jif', '.jfif', '.jp2', '.jpx', '.j2k', '.j2c', '.fpx', '.pcd', '.png', '.pdf'],
	altIsInvalid: ['photo', 'spacer', 'separator', 'nbsp', 'image'],
	altStartsWithInvalid: ['image of', 'graphic of'],
	altEndsWithInvalid: ['bytes'],
	msgAltEmpty: 'Please type the text alternative for the image',
	msgAltToLong: 'The text alternative is %s1 characters, which is longer than the recommended maximum length of %s2 characters.\n\nAre you sure you want to continue?',
	msgAltPrefix: 'The text alternative should succinctly describe the content of the image.',
	msgAltContainsFilename: 'Please remove the filename with the extension "%s" from the text alternative.',
	msgAltIsInvalid: 'Please remove "%s" from the text alternative.',
	msgAltStartsWithInvalid: 'Please remove "%s" from the text alternative.',
	msgAltEndsWithInvalid: 'Please do not include the size of the image in the text alternative.',
	msgAddDescription: 'A complex image must include a long description within the document. If there is no long description, the image type will be changed to \'Simple\'.\n\nAre you sure you want to continue?',
	msgChooseLocation: 'Please select the location of the long description within the document relative to the image.'
} );
