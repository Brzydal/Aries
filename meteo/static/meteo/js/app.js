
/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show();
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
    var myLatLng = {};
    myLatLng['lat'] = position.coords.latitude;
    myLatLng['lng'] = position.coords.longitude;

    initMap(myLatLng); //load map using your lat/lng coordinates
  });
});



$(document).ready(function() {
  loadWeather('-25.363,131.044',''); //@params location, woeid
  initMap({lat: -25.363, lng: 131.044});
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}


function initMap(myLatLng) {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      draggable: true,
      position: myLatLng,
      map: map,
      title: 'Hello World!'

    });

    google.maps.event.addListener(marker, 'dragend', function(){
        var coord = marker.getPosition().toUrlValue();
        loadWeather(coord);
      });

    }



