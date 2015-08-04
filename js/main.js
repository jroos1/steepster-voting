$(function() {
  // Handler for .ready() called.

  $('header h1').html("Jason");

  console.log($('header h2').html());

  $('header').append('<h3>Im a new h3</h3>');

});