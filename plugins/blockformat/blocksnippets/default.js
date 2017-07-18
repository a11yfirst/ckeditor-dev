/**
 * @license Copyright (c) 2017, CKSource - Nick Hoyt, Jon Gunderson. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
// Register a block snippets definition set named "default".
CKEDITOR.addBlockSnippets( 'default', {

	// The block snippets definitions array.
	blockSnippets: [ 
	{
		id: 'citation-journal',
		group: 'Citation',
		label: 'Journal',
		html: '<p class="citation journal">[Author last name], [First initial]. [Middle initial]. ([Publication year]). [Title of article]. <em>[Title of journal]</em>, <em>[Volume number]</em>([Issue number]), [Page number starts]-[ends].</p>'
	},
	{
		id: 'citation-print-book',
		group: 'Citation',
		label: 'Print Book',
		html: '<p class="citation book">[Author last name], [First initial]. [Middle initial]. ([Publication year]). <em>[Title of work]</em>. [Location]: [Publisher].</p>'
	},
	{
		id: 'citation-ebook',
		group: 'Citation',
		label: 'Electronic Book',
		html: '<p class="citation ebook">[Author Last Name]’ [Author first name initials]. ([Date]). <em>[Book Title]</em> Retrieved from [URL]</p>'
	},
	{
		id: 'citation-web',
		group: 'Citation',
		label: 'Website',
		html: '<p class="citation book">[Author Last Name], [Author First Name Initial]. ([Date of publication]). <em>[Title of document]</em>. Retrieved from [http://Web address]</p>'
	}
 ]
} );
