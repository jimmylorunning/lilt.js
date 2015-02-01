/*!
 * lilt.js  v0.1 (https://github.com/jimmylorunning/lilt.js)
 * Copyright (c) 2015
 * Licensed under MIT (https://github.com/jimmylorunning/lilt.js/LICENSE)
 */

(function( $ ) {
  $.fn.liltMoveShadow = function(options) {
    return this.each(function() {

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


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function ( $ ) {

  $.fn.lilt = function animloop(){
    requestAnimationFrame(animloop);
    $(".lilt").liltMoveShadow($.lilt_options);
  };

}(jQuery));

/*
on page load, run lilt:
$().lilt();

optional: set default options for your page:
$.lilt_options = {'shadow-color': '#ff0000'};

override individual tags with data attributes
*/