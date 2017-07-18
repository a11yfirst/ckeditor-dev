/**
 * @license Copyright (c) 2017, CKSource - Nick Hoyt, Jon Gunderson. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
// Register a block snippets definition set named "default".
CKEDITOR.addBlockSnippets( 'library', {

	// The block snippets definitions array.
	blockSnippets: [ 
	{
		id: 'event',
		label: 'Event',
		description: 'Insert a preformatted event block.',
		html: '<ul style="list-style: none">' +
			'<li>Title: <strong>[title of event]</strong></li>' +
			'<li>Date: <strong>[Month] [Day], [Year]</strong></li>' +
			'<li>Time: <strong>[Hour]:[Minutes]</strong></li>' +
			'<li>Duration: <strong>[NN] minutes</strong></li>' +
			'<li>Contact: <strong>[Name]</strong></li>' +
			'<li>E-mail: <strong>[e-mail]</strong></li>' +
			'<li>WWW: <strong>[url]</strong></li>' +
			'</ul>'
	}
 ]
} );
