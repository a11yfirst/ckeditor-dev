/**
* Copyright (c) 2018 University of Illinois - Jon Gunderson and Nicholas Hoyt. All rights reserved.
* For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.ui.button.prototype.setState = function ( state ) {
  if ( this._.state == state )
    return false;

  this._.state = state;

  var element = CKEDITOR.document.getById( this._.id );

  if ( element ) {
    element.setState( state, 'cke_button' );
    element.setAttribute( 'aria-disabled', state == CKEDITOR.TRISTATE_DISABLED );

    if ( !this.hasArrow ) {
      // Note: aria-pressed attribute should not be added to menuButton instances. (https://dev.ckeditor.com/ticket/11331)
      if ( state === CKEDITOR.TRISTATE_ON ) {
        element.setAttribute( 'aria-pressed', true );
      }
      else {
        element.removeAttribute( 'aria-pressed' );
      }
    }
    else {
      // Indicates that menu button is opened (#421).
      element.setAttribute( 'aria-expanded', state == CKEDITOR.TRISTATE_ON );
    }
    return true;
  }
  else {
    return false;
  }
};
