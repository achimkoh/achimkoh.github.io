jQuery(document).ready(function($){
    // smooth scroll to inner links instead of jumps
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': ($target.offset().top)
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});