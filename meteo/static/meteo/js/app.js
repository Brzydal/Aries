
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

//        html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        html = '<ul><li>'+weather.title+'</li></ul><br>';
//        html += '<li class="currently">'+weather.currently+'</li>';
//        html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';

html += '<div class="wrap">';
html += '<div class="table">';
html += '<ul>';

html += '<li>';
html += '  <div class="top">';
html += '    <h1>Today</h1>';
html += '    <div class="circle"><h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2></div>';
html += '  </div>';

html += '  <div class="bottom">';
html += '    <p><strong>CURRENTLY:</strong>'+weather.currently+'</p>';
html += '    <p><strong>HIGH TEMP.:</strong>'+weather.high+'&deg;C</p>';
html += '    <p><strong>LOW TEMP.:</strong>'+weather.low+'&deg;C</p>';
html += '    <p><strong>WIND DIRECTION:</strong>'+weather.wind.direction+'</p>';
html += '    <p><strong>WIND SPEED:</strong>'+weather.wind.speed+weather.units.speed+'</p>';
html += '    <p><strong>PRESSURE:</strong>'+weather.pressure+weather.units.pressure+'</p>';
html += '    <p><strong>HUMIDITY:</strong>'+weather.humidity+'%</p>';
html += '    <p><strong>VISIBILITY:</strong>'+weather.visibility+weather.units.distance+'</p>';
html += '    <p><strong>SUNRISE:</strong>'+weather.sunrise+'</p>';
html += '    <p><strong>SUNSET:</strong>'+weather.sunset+'</p>';
html += '    <p><strong>IMAGE:</strong> <img src="> '+weather.image+'" alt="Image" height="42" width="42"</p>';
html += '    <p><strong>Thumbnail:</strong> <img src="> '+weather.thumbnail+'" alt="Image" height="42" width="42"</p>';

html += '    <div class="sign">';
html += '    <a href="#" class="button">SIGN UP</a>';
html += '    </div>';
html += '  </div>';
html += '</li>';

html += '</ul>';
html += '</div>';
html += '</div>';



//      for(var i=0;i<weather.forecast.length;i++) {
//        html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
//      }

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



