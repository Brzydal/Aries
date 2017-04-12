$(document).ready(function () {

// AJAX for NASA picture of the Day
$.ajax({url: "https://api.nasa.gov/planetary/apod?api_key=ZGAfeRDeK55E65GxGcPXVXQVsIsgz8aW95jlq3Sj",
      success: function(result){$("body").attr('background',result.url);},
      error: function(result){$("#picture").attr('alt','Picture not loaded');}
});

// Validation of Register Profile Form
var form = $('#contact')

form.on("keyup",function () {

var email = $('#id_email');
var pass1 = $('#id_password');
var pass2 = $('#id_confirm_password');

if (email.val().indexOf('@')==-1 || email.val().indexOf('.') == -1){
  email.css('border-color', 'red');
//  return false;
}else{
  email.css('border-color', 'lightgreen');
}

if (pass1.val()!=pass2.val()){
  pass1.css('border-color', 'red');
  pass2.css('border-color', 'red');
//  return false;
}else{
  pass1.css('border-color', 'lightgreen');
  pass2.css('border-color', 'lightgreen');
}

});

});