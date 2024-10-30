jQuery(document).ready(function() {
	var casiarw_overall = 0;
	var casiarw_overall_count = 0;
	var casiarw_rating = 0;
	casiarw_rating_rounded = 0;

	var casiarw_color1 = '#EC4D37';
	var casiarw_color2 = '#1D1B1B';
	var casiarw_color3 = '#FFFFFF';

	jQuery('.casiarw-review').each(function() {
		var classname = this.className;
		var classparts = classname.split(' ');

		jQuery.each(classparts, function( index, value ) {
			if (value.indexOf("casiarw-review--color1") == 0) {
				casiarw_color1 = value.slice(23, 30);
			}
			if (value.indexOf("casiarw-review--color2") == 0) {
				casiarw_color2 = value.slice(23, 30);
			}
			if (value.indexOf("casiarw-review--color3") == 0) {
				casiarw_color3 = value.slice(23, 30);
			}
		});

		casiarw_overall = 0;
		casiarw_overall_count = 0;
		casiarw_rating = 0;
		casiarw_rating_rounded = 0;

		casiarw_meta_displaytype = jQuery(this).attr('meta-displaytype');

		jQuery(this).find('.casiarw-review__row').each(function() {
			//Change colors
			jQuery(this).css('background-color', casiarw_color2);
			jQuery(this).find('.casiarw-review__filled').css('background-color', casiarw_color1);
			jQuery(this).find('.casiarw-review__rowtitle').css('color', casiarw_color3);
			jQuery(this).find('.casiarw-review__rating').css('color', casiarw_color3);

			//set rating of row
			if (casiarw_meta_displaytype==='stars') {
				width = jQuery(this).find('.full-stars').attr('meta-rating')*10+'%';
				jQuery(this).find('.full-stars').css('width', width);
				jQuery(this).find('.casiarw-review__filled').hide();
			} else if (casiarw_meta_displaytype==='numbers') {
				jQuery(this).find('.ratings-container').hide();
			}

			//Set review overall rating
			casiarw_overall += parseInt(jQuery(this).find('.casiarw-review__rating').text());
			casiarw_overall_count++;
			casiarw_rating = casiarw_overall/casiarw_overall_count;
		})

		casiarw_rating_rounded = Math.round( casiarw_rating * 10 ) / 10;

		//set overall rating
		if (casiarw_meta_displaytype==='stars') {
			jQuery(this).find('.casiarw-review__overall .full-stars').css('width', casiarw_rating * 10+'%');
		} else if (casiarw_meta_displaytype==='numbers') {
			jQuery(this).closest('.casiarw-review').find('.casiarw-review__overall').text(casiarw_rating_rounded);
		}
	});

	jQuery('.casiarw-review__row').each(function() {
		var rowWidth = jQuery(this).outerWidth();
		var rating = jQuery(this).find('.casiarw-review__rating').text();
	});
});