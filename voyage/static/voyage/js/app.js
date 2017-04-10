//Java for fish template to be reviewed !!!
$('document').ready(function(){
	$('input[type="text"], input[type="email"], textarea').focus(function(){
		var background = $(this).attr('id');
		$('#' + background + '-form').addClass('formgroup-active');
		$('#' + background + '-form').removeClass('formgroup-error');
	});
	$('input[type="text"], input[type="email"], textarea').blur(function(){
		var background = $(this).attr('id');
		$('#' + background + '-form').removeClass('formgroup-active');
	});

function errorfield(field){
	$(field).addClass('formgroup-error');
	console.log(field);
}

$("#waterform").submit(function() {
	var stopsubmit = false;

if($('#name').val() == "") {
	errorfield('#name-form');
	stopsubmit=true;
}
if($('#email').val() == "") {
	errorfield('#email-form');
	stopsubmit=true;
}
  if(stopsubmit) return false;
});

//Google Maps API to be reviewed

$(document).on("google_point_map_widget:marker_create", function (e, lat, lng, locationInputElem, mapWrapID) {
    console.log(locationInputElem); // django widget textarea widget (hidden)
    console.log(lat, lng); // created marker coordinates
    console.log(mapWrapID); // map widget wrapper element ID
});

$(document).on("google_point_map_widget:marker_change", function (e, lat, lng, locationInputElem, mapWrapID) {
    console.log(locationInputElem); // django widget textarea widget (hidden)
    console.log(lat, lng);  // changed marker coordinates
    console.log(mapWrapID); // map widget wrapper element ID
});

$(document).on("google_point_map_widget:marker_delete", function (e, lat, lng, locationInputElem, mapWrapID) {
    console.log(locationInputElem); // django widget textarea widget (hidden)
    console.log(lat, lng);  // deleted marker coordinates
    console.log(mapWrapID); // map widget wrapper element ID
})

//Ajax for NASA Api
$.ajax({url: "https://api.nasa.gov/planetary/apod?api_key=ZGAfeRDeK55E65GxGcPXVXQVsIsgz8aW95jlq3Sj",
      success: function(result){$("#picture").attr('src',result.url);},
      error: function(result){$("#picture").attr('alt','Picture not loaded');}
});

//$.ajax({url: "https://api.nasa.gov/EPIC/api/natural/images?api_key=ZGAfeRDeK55E65GxGcPXVXQVsIsgz8aW95jlq3Sj",
//      success: function(result){$("#argh").html('Jupi');,
//      error: function(result){$("#argh").html('Grrrrr!!!');}
//});




});