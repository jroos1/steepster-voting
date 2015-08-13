$(function() {
  // Handler for .ready() called.

  $('.right-nav').click(function() {
  	$('.nav-mobile').slideToggle();
  });

  $( window ).resize (function() {
  	if($( window ).width() >= 1024) {
  		$('.nav-mobile').hide();
  	}
  });
  
});