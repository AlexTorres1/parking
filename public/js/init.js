(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
  
  $('select').formSelect();
  $('#modal1').modal();
  $('#modal2').modal();
  $('#modal3').modal();
  $('#modal4').modal();
  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
  });
  $('.dropdown-trigger').dropdown()
  // $('.datepicker').datepicker();
});

// $('.datepicker').datepicker();

// $(document).ready(function(){
//   $('.carousel').carousel();
// });