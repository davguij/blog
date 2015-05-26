/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        var pattern = Trianglify({
        	width: $(".site-head").innerWidth(),
        	height: $(".site-head").innerHeight()
        });

        $(".site-head").css("background-image", "url(" + pattern.png() + ")");

    });

}(jQuery));