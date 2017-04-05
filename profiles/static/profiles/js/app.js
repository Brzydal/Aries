$(document).ready(function () {

$.ajax({url: "https://api.nasa.gov/planetary/apod?api_key=ZGAfeRDeK55E65GxGcPXVXQVsIsgz8aW95jlq3Sj",
      success: function(result){$("#picture").attr('src',result.url);},
      error: function(result){$("#picture").attr('alt','Picture not loaded');}
});

});