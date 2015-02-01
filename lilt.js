/*!
 * lilt.js  v0.1 (https://github.com/jimmylorunning/lilt.js)
 * Copyright (c) 2015
 * Licensed under MIT (https://github.com/jimmylorunning/lilt.js/LICENSE)
 */

(function( $ ) {
  $.fn.liltMoveShadow = function(options) {
    return this.each(function() {

      var settings = $.extend({
        'horizontal-offset': "-20px",
        'blur-radius': "40px",
        'spread-radius': "0px",
        'shadow-color': "#999999",
        'subtleness': "7"
      }, options, {
        'horizontal-offset': $(this).data("horizontal-offset"),
        'blur-radius': $(this).data("blur-radius"),
        'spread-radius': $(this).data("spread-radius"),
        'shadow-color': $(this).data("shadow-color"),
        'subtleness': $(this).data("subtleness")
      } );

      // avoid divide by zero & negative numbers
      if (settings['subtleness'] < 1) {
        settings['subtleness'] = 1;
      }

      scrollYPos = $(window).scrollTop();
      boxYPos = $(this).offset().top;
      verticalOffset = Math.ceil((boxYPos - scrollYPos) / settings['subtleness']);
      shadowStyle = settings['horizontal-offset'] + ' ' + verticalOffset + "px " + settings['blur-radius'] + ' ' + settings['spread-radius'] + ' ' + settings['shadow-color'];

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
    $(".lilt").liltMoveShadow(options);
    $(window).scroll( function() {
      $(".lilt").liltMoveShadow(options);
    });
  }

}(jQuery, window, document));
