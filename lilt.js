/*!
 * lilt.js  v0.1 (https://github.com/jimmylorunning/lilt.js)
 * Copyright (c) 2015
 * Licensed under MIT (https://github.com/jimmylorunning/lilt.js/LICENSE)
 */

(function( $ ) {
  $.fn.liltMoveShadow = function(options) {
    return this.each(function() {

      console.log('hahaha');
      var settings = $.extend({
        'horizontal-length': "-20px",
        'blur-radius': "5px",
        'spread-radius': "5px",
        'shadow-color': "#999999",
        'subtleness': "5"
      }, options, {
        'horizontal-length': $(this).data("horizontal-length"),
        'blur-radius': $(this).data("blur-radius"),
        'spread-radius': $(this).data("spread-radius"),
        'shadow-color': $(this).data("shadow-color"),
        'subtleness': $(this).data("subtleness")
      } );

      // avoid divide by zero & negative numbers
      if (settings['subtleness'] < 1) {
        settings['subtleness'] = 1;
      }

      scrollPos = $(window).scrollTop();
      boxPos = $(this).offset().top;
      shadowPos = Math.ceil((boxPos - scrollPos) / settings['subtleness']);
      shadowStyle = settings['horizontal-length'] + ' ' + shadowPos + "px " + settings['blur-radius'] + ' ' + settings['spread-radius'] + ' ' + settings['shadow-color'];

      /* probably should test for vendor supported property: */
      /* http://www.javascriptkit.com/javatutors/setcss3properties.shtml */
      $(this).css('box-shadow', shadowStyle);
      $(this).css('-moz-box-shadow', shadowStyle);
      $(this).css('-webkit-box-shadow', shadowStyle);

    }); // .each
  }
}( jQuery ));


(function ( $, window, document, undefined ) {

  $.fn.lilt = function(options) {
    $(window).scroll( function() {
      $(".lilt").liltMoveShadow(options);
    });
  }

}(jQuery, window, document));

/*
on page load, run lilt:
$().lilt();

optional: set default options for your page:
$().lilt( {'shadow-color': '#ff0000'} );

override individual tags with data attributes
*/