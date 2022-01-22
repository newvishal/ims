$(function(e) {
	'use strict'
	
	// Select2
	$('.select2').select2({
		minimumResultsForSearch: Infinity
	});
	// Select2 by showing the search
	$('.select2-show-search').select2({
		minimumResultsForSearch: ''
	});
	
});