

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
//  initMap({lat: -25.363, lng: 131.044});

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


var map;
var geoJSON;
var request;
var gettingData = false;
var openWeatherMapKey = "b52d55bed391bb21898ec822730fcbf3"

function initMap(myLatLng) {

    var mapOptions = {
      zoom: 5,
      center: myLatLng,
    };
    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

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

    // Add interaction listeners to make weather requests
    google.maps.event.addListener(map, 'idle', checkIfDataRequested);
    // Sets up and populates the info window with details
    map.data.addListener('click', function(event) {
      infowindow.setContent(
       "<img src=" + event.feature.getProperty("icon") + ">"
       + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
       + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
       + "<br />" + event.feature.getProperty("weather")
       );
      infowindow.setOptions({
          position:{
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          },
          pixelOffset: {
            width: 0,
            height: -15
          }
        });
      infowindow.open(map);
    });

    }

  var checkIfDataRequested = function() {
    // Stop extra requests being sent
    while (gettingData === true) {
      request.abort();
      gettingData = false;
    }
    getCoords();
  };
  // Get the coordinates from the Map bounds
  var getCoords = function() {
    var bounds = map.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();
    getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());

  };
  // Make the weather request
  var getWeather = function(northLat, eastLng, southLat, westLng) {
    gettingData = true;
    if ($('input[name=layer]:checked').val()=='city'){
        var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="
                            + westLng + "," + northLat + "," //left top
                            + eastLng + "," + southLat + "," //right bottom
                            + map.getZoom()
                            + "&cluster=yes&format=json"
                            + "&APPID=" + openWeatherMapKey;
    }
//    else {
//        var requestString = "http://tile.openweathermap.org/map/"
//                            + $('input[name=layer]:checked').val() +"/" //layer
//                            + '4'+ "/" + '4' + "/" //left top
////                            + eastLng + "," + southLat + "," //right bottom
//                            + map.getZoom()
//                            + ".png?"
//                            + "appid=" + openWeatherMapKey;
//    }


//    console.log(westLng);
//    console.log(northLat);
//    console.log(eastLng);
//    console.log(southLat);
//    console.log(requestString);
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
  };
  // Take the JSON results and proccess them
  var proccessResults = function() {
    console.log(this);
    var results = JSON.parse(this.responseText);

    if (results.list.length > 0) {
        resetData();
        for (var i = 0; i < results.list.length; i++) {
            console.log(results.list[i]);
          geoJSON.features.push(jsonToGeoJson(results.list[i]));
        }
        console.log(geoJSON);
        drawIcons(geoJSON);

    }
  };
  var infowindow = new google.maps.InfoWindow();
  // For each result that comes back, convert the data to geoJSON
  var jsonToGeoJson = function (weatherItem) {
    var feature = {
      type: "Feature",
      properties: {
        city: weatherItem.name,
        weather: weatherItem.weather[0].main,
        temperature: weatherItem.main.temp,
        min: weatherItem.main.temp_min,
        max: weatherItem.main.temp_max,
        humidity: weatherItem.main.humidity,
        pressure: weatherItem.main.pressure,
        windSpeed: weatherItem.wind.speed,
        windDegrees: weatherItem.wind.deg,
        windGust: weatherItem.wind.gust,
        icon: "http://openweathermap.org/img/w/"
              + weatherItem.weather[0].icon  + ".png",
        coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
      },
      geometry: {
        type: "Point",
        coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
      }
    };
    // Set the custom marker icon
    map.data.setStyle(function(feature) {
      return {
        icon: {
          url: feature.getProperty('icon'),
          anchor: new google.maps.Point(25, 25)
        }
      };
    });
    // returns object
    return feature;
  };
  // Add the markers to the map
  var drawIcons = function (weather) {
     map.data.addGeoJson(geoJSON);
     // Set the flag to finished
     gettingData = false;
  };
  // Clear data layer and geoJSON
  var resetData = function () {
    geoJSON = {
      type: "FeatureCollection",
      features: []
    };
    map.data.forEach(function(feature) {
      map.data.remove(feature);
    });
  };

google.maps.event.addDomListener(window, 'load', initMap({lat: -25.363, lng: 131.044}));

$('#layers').on('click', function() {
  console.log($('input[name=layer]:checked').val());

var map = new ol.Map({
    target: 'map1',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
});
var zoom = map.getView().getZoom()
var tile_x = long2tile(37.41,zoom)
function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
var tile_y = lat2tile(8.82,zoom)
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
console.log(tile_x);
console.log(tile_y);
    var layer_cloud = new ol.layer.Tile({
          source: new ol.source.XYZ({
            // Replace this URL with a URL you generate. To generate an ID go to http://home.openweathermap.org/
            // and click "map editor" in the top right corner. Make sure you're registered!
            url: 'http://tile.openweathermap.org/map/clouds/'
            +map.getView().getZoom()+'/'
            +tile_x+'/'
            +tile_y+'.png?appid=b52d55bed391bb21898ec822730fcbf3',
          })
      });

map.addLayer(layer_cloud);


console.log(layer_cloud.getSource())

});