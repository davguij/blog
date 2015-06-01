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

        var getAverageColor = function getAverageColor(imgEl) {
		    var blockSize = 5, // only visit every 5 pixels
		        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
		        canvas = document.createElement('canvas'),
		        context = canvas.getContext && canvas.getContext('2d'),
		        data, width, height,
		        i = -4,
		        length,
		        rgb = {r:0,g:0,b:0},
		        count = 0;
		    if (!context) {
		        return defaultRGB;
		    }
		    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
		    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
		    context.drawImage(imgEl, 0, 0);
		    try {
		        data = context.getImageData(0, 0, width, height);
		    } catch(e) {
		        /* security error, img on diff domain */
		        return defaultRGB;
		    }
		    length = data.data.length;
		    while ( (i += blockSize * 4) < length ) {
		        ++count;
		        rgb.r += data.data[i];
		        rgb.g += data.data[i+1];
		        rgb.b += data.data[i+2];
		    }
		    // ~~ used to floor values
		    rgb.r = ~~(rgb.r/count);
		    rgb.g = ~~(rgb.g/count);
		    rgb.b = ~~(rgb.b/count);
		    return rgb;
		};

		var getContrast = function getContrast(hexcolor){
			var r = parseInt(hexcolor.substr(0,2),16);
			var g = parseInt(hexcolor.substr(2,2),16);
			var b = parseInt(hexcolor.substr(4,2),16);
			var yiq = ((r*299)+(g*587)+(b*114))/1000;
			return (yiq >= 128) ? 'black' : 'white';
		};

		function componentToHex(c) {
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		}

		var rgbToHex = function rgbToHex(r, g, b) {
		    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}

        var bgAvgColor = getAverageColor(pattern.canvas());

        console.log(getContrast(rgbToHex(bgAvgColor.r, bgAvgColor.g, bgAvgColor.b)));

        $(".site-head-content").addClass(getContrast(rgbToHex(bgAvgColor.r, bgAvgColor.g, bgAvgColor.b)));

    });

}(jQuery));