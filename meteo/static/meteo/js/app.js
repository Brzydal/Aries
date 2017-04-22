
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
        html += '<ul id="forecast">';

        html += '<li>';
        html += '  <div class="top purple white">';
        html += '    <h1>Today</h1>';
        html += '    <div class="circle pink"><h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2></div>';
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

        html += '  </div>';
        html += '</li>';





      for(var i=0;i<3;i++) {
//        html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
        html += '<li>';
        html += '  <div class="top">';
        html += '    <h1>'+weather.forecast[i].day+'</h1>';
        html += '    <div class="circle"><h2><i class="icon-'+weather.forecast[i].code+'"></i> '+Math.floor((parseInt(weather.forecast[i].high)+parseInt(weather.forecast[i].low))/2)+'&deg;'+weather.units.temp+'</h2></div>';
        html += '  </div>';

        html += '  <div class="bottom">';
        html += '    <p><strong>CONDITION:</strong>'+weather.forecast[i].text+'</p>';
        html += '    <p><strong>HIGH TEMP.:</strong>'+weather.forecast[i].high+'&deg;C</p>';
        html += '    <p><strong>LOW TEMP.:</strong>'+weather.forecast[i].low+'&deg;C</p>';
        html += '    <p><strong>DATE:</strong>'+weather.forecast[i].date+'</p>';


        html += '  </div>';
        html += '</li>';
      }

        html += '</ul>';
        html += '</div>';
        html += '</div>';

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



