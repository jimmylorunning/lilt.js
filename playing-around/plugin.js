(function( $ ) {

    $.fn.myThing = function( options ) {

      return this.each(function() {
        var settings = $.extend({
          color: "#556b2f",
          backgroundColor: "white"
        }, options, {
          color: $(this).data("something")
        } );

        console.log($(this).data("something"));

        $(this).css({
          "color": settings.color,
          "backgroundColor": settings.backgroundColor
        }); // .css
      }); // .each

    };
}( jQuery ));


$( ".thing" ).myThing({
    color: "orange"
});

/* $.fn.greenify = function() {
    this.css( "color", "green" );
};

$( "a" ).greenify(); */