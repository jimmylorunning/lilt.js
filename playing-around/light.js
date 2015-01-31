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

function moveShadow() {
  horizontalLength = "-88px ";
  blurRadius = "134px ";
  spreadRadius = "5px ";
  shadowColor = "#818181";

  scrollPos = $(window).scrollTop();
  boxPos = $('#box').offset().top;
  shadowPos = boxPos - scrollPos;
  shadowStyle = horizontalLength + shadowPos + "px " + blurRadius + spreadRadius + shadowColor;

  /* probably should test for vendor supported property: */
  /* http://www.javascriptkit.com/javatutors/setcss3properties.shtml */
  document.getElementById("box").style['boxShadow']= shadowStyle;
  document.getElementById("box").style['MozBoxShadow']= shadowStyle;
  document.getElementById("box").style['WebkitBoxShadow']= shadowStyle;
}

(function animloop(){
  requestAnimationFrame(animloop);
  moveShadow();
})();
