(function($) {
	"use strict";
	
	// ______________Side Menu Icons
	$(document).on('click', '#myonoffswitch', function(e){
		if (this.checked) {
			$('body').addClass('Sidemenu-left-icons');
			$('body').removeClass('Sidemenu-icons-none');
		}
		else {
			$('body').removeClass('Sidemenu-left-icons');
			localStorage.setItem("Sidemenu-left-icons", "false");
		}
	});
	
	// ______________Side Menu Icons
	$(document).on('click', '#myonoffswitch1', function(e){
		if (this.checked) {
			$('body').addClass('Sidemenu-icons-none');
			$('body').removeClass('Sidemenu-left-icons');
		}
		else {
			$('body').removeClass('Sidemenu-icons-none');
			localStorage.setItem("Sidemenu-icons-none", "false");
		}
	});
	
	// ______________Side Menu Icons
	$(document).on('click', '#myonoffswitch2', function(e){
		if (this.checked) {
			$('body').addClass('Sidemenu-right-icons');
			$('body').removeClass('Sidemenu-left-icons');
			$('body').removeClass('Sidemenu-icons-none');
		}
		else {
			$('body').removeClass('Sidemenu-right-icons');
			localStorage.setItem("Sidemenu-right-icons", "false");
		}
	});
	
	// ______________Body Light
	$(document).on('click', '#myonoffswitch3', function(e){
		if (this.checked) {
			$('body').addClass('body-light');
		}
		else {
			$('body').removeClass('body-light');
			localStorage.setItem("body-light", "false");
		}
	});
	
	// ______________Card Shadow
	$(document).on('click', '#myonoffswitch4', function(e){
		if (this.checked) {
			$('body').addClass('body-card-shadow');
		}
		else {
			$('body').removeClass('body-card-shadow');
			localStorage.setItem("body-card-shadow", "false");
		}
	});
	
	// ______________Card Ligtht
	$(document).on('click', '#myonoffswitch5', function(e){
		if (this.checked) {
			$('body').addClass('bg-card-light');
		}
		else {
			$('body').removeClass('bg-card-light');
			localStorage.setItem("bg-card-light", "false");
		}
	});
	
	// ______________Left Menu Light
	$(document).on('click', '#myonoffswitch6', function(e){
		if (this.checked) {
			$('body').addClass('Left-menu-light');
			$('body').removeClass('Left-menu-Default');
			$('body').removeClass('Left-menu-Dark');
		}
		else {
			$('body').removeClass('Left-menu-light');
			localStorage.setItem("Left-menu-light", "false");
		}
	});
	
	// ______________Left Menu White
	$(document).on('click', '#myonoffswitch10', function(e){
		if (this.checked) {
			$('body').addClass('Left-menu-Default');
			$('body').removeClass('Left-menu-light');
			$('body').removeClass('Left-menu-Dark');
		}
		else {
			$('body').removeClass('Left-menu-Default');
			localStorage.setItem("Left-menu-Default", "false");
		}
	});
	
	// ______________Left Menu Dark
	$(document).on('click', '#myonoffswitch11', function(e){
		if (this.checked) {
			$('body').addClass('Left-menu-Dark');
			$('body').removeClass('Left-menu-light');
			$('body').removeClass('Left-menu-Default');
		}
		else {
			$('body').removeClass('Left-menu-Dark');
			localStorage.setItem("Left-menu-Dark", "false");
		}
	});
	
	// ______________Light Mode
	$(document).on('click', '#myonoffswitch7', function(e){
		if (this.checked) {
			$('body').addClass('light-mode');
			$('body').removeClass('dark-mode');
		}
		else {
			$('body').removeClass('light-mode');
			localStorage.setItem("light-mode", "false");
		}
	});
	
	// ______________Dark Mode
	$(document).on('click', '#myonoffswitch8', function(e){
		if (this.checked) {
			$('body').addClass('dark-mode');
			$('body').removeClass('light-mode');
		}
		else {
			$('body').removeClass('dark-mode');
			localStorage.setItem("dark-mode", "false");
		}
	});
	
	// ______________Side Menu User Hide
	$(document).on('click', '#myonoffswitch9', function(e){
		if (this.checked) {
			$('body').addClass('sidemenu-userhide');
		}
		else {
			$('body').removeClass('sidemenu-userhide');
			localStorage.setItem("sidemenu-userhide", "false");
		}
	});
	
	// ______________Boxed
	$(document).on('click', '#myonoffswitch12', function(e){
		if (this.checked) {
			$('body').addClass('boxed');
			$('body').removeClass('default');
		}
		else {
			$('body').removeClass('boxed');
			localStorage.setItem("boxed", "false");
		}
	});
	
	// ______________Boxed
	$(document).on('click', '#myonoffswitch13', function(e){
		if (this.checked) {
			$('body').addClass('default');
			$('body').removeClass('boxed');
		}
		else {
			$('body').removeClass('default');
			localStorage.setItem("default", "false");
		}
	});
	
	
	//Color-Theme
	$(document).on("click", "a[data-theme]", function() {
		$("head link#theme").attr("href", $(this).data("theme"));
		$(this).toggleClass('active').siblings().removeClass('active');
	});
	
	// ______________Full screen
	$(document).on("click", ".fullscreen-button", function toggleFullScreen() {
		if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	})
	
	
	// ______________Quantity Cart Increase & Descrease
	$(function () {
		$('.add').on('click',function(){
			var $qty=$(this).closest('div').find('.qty');
			var currentVal = parseInt($qty.val());
			if (!isNaN(currentVal)) {
				$qty.val(currentVal + 1);
			}
		});
		$('.minus').on('click',function(){
			var $qty=$(this).closest('div').find('.qty');
			var currentVal = parseInt($qty.val());
			if (!isNaN(currentVal) && currentVal > 0) {
				$qty.val(currentVal - 1);
			}
		});
	});
	
	
	// ______________ PAGE LOADING
	$(window).on("load", function(e) {
		$("#global-loader").fadeOut("slow");
	})
	
	// ______________ BACK TO TOP BUTTON
	$(window).on("scroll", function(e) {
		if ($(this).scrollTop() > 0) {
			$('#back-to-top').fadeIn('slow');
		} else {
			$('#back-to-top').fadeOut('slow');
		}
	});
	$(document).on("click", "#back-to-top", function(e) {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});
	
	
	// ______________ COVER IMAGE
	$(".cover-image").each(function() {
		var attr = $(this).attr('data-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});
	
	
	// Search	
	$('.search-btn').click(function(){
		$('.search-area').fadeIn(); 
		$('body').addClass("search-header");
		$('.close-btn').fadeIn();              
	});
	$('.close-btn').click(function(){
		$('.search-area').fadeOut();  
		$('body').removeClass("search-header");        
	});	
	
	
	// ______________Chart-circle
	if ($('.chart-circle').length) {
		$('.chart-circle').each(function() {
			let $this = $(this);
			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: 'rgba(119, 119, 142, 0.1)',
				lineCap: 'round'
			});
		});
	}

	// ______________ CARD
	const DIV_CARD = 'div.card';
	
	// ______________ TOOLTIP
	$('[data-toggle="tooltip"]').tooltip();
	
	// ______________ POPOVER
	$('[data-toggle="popover"]').popover({
		html: true
	});
	
	// ______________ FUNCTION FOR REMOVE CARD
	$(document).on('click', '[data-toggle="card-remove"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});
	
	
	// ______________ FUNCTIONS FOR COLLAPSED CARD
	$(document).on('click', '[data-toggle="card-collapse"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	
	// ______________ CARD FULL SCREEN
	$(document).on('click', '[data-toggle="card-fullscreen"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	
	
	// Select2
	$('.select2').select2({
		minimumResultsForSearch: Infinity
	});
	// Select2 by showing the search
	$('.select2-show-search').select2({
		minimumResultsForSearch: ''
	});


	
})(jQuery);
