

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

    marker.setLatLng(new L.LatLng(position.coords.latitude, position.coords.longitude),{draggable:'true'});
    mymap.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
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


        html = '<ul><li>'+weather.title+'</li></ul><br>';

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
    map = new google.maps.Map(document.getElementById('mapid'),
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
        console.log(coord)
      });



//    //LEAFLET MAP
//
//    //tile layers
//    var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
//        maxZoom: 18,
//        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//    });
//
//    var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
//        maxZoom: 18,
//        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//    });
//
//    var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
//    });
//
//    //leaflet map
//    var map = L.map('map', {
//        center: [myLatLng.lat, myLatLng.lng],
//        zoom: 5,
//        layers: [OpenStreetMap_Mapnik]
//    });
//
//    var marker = new L.marker([-25.363, 131.044], {draggable:'true'}).addTo(map).bindPopup("I am a green leaf.");
//
//    marker.on('dragend', function(event){
//        var marker = event.target;
//        var position = marker.getLatLng();
//        marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
//        map.panTo(new L.LatLng(position.lat, position.lng));
//        console.log((position.lat).toFixed(6), (position.lng).toFixed(6));
//        loadWeather((position.lat).toFixed(6)+','+(position.lng).toFixed(6));
//
//      });
//
//    //weather layers
//    var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
//        attribution: 'Map data © OpenWeatherMap',
//        maxZoom: 18,
//        opacity: 0.5
//    })
//    var precipitation = L.tileLayer('http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
//        attribution: 'Map data © OpenWeatherMap',
//        maxZoom: 18,
//        opacity: 0.5
//    })
//    var pressure = L.tileLayer('http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
//        attribution: 'Map data © OpenWeatherMap',
//        maxZoom: 18,
//        opacity: 0.5
//    })
//    var wind = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
//        attribution: 'Map data © OpenWeatherMap',
//        maxZoom: 18,
//        opacity: 0.5
//    })
//    var temperature = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
//        attribution: 'Map data © OpenWeatherMap',
//        maxZoom: 18,
//        opacity: 0.5
//    })
//
//
//    var baseMaps = {
//        "Normal": OpenStreetMap_Mapnik,
//        "Black & White": OpenStreetMap_BlackAndWhite,
//        "Color": Esri_WorldImagery
//    };
//
//    var overlayMaps = {
//        "Clouds": clouds,
//        "Precipitation":precipitation,
//        "Pressure": pressure,
//        "Wind": wind,
//        "Temperature":temperature,
//    };
//
//
//    L.control.layers(baseMaps, overlayMaps).addTo(map);



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

    var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="
                            + westLng + "," + northLat + "," //left top
                            + eastLng + "," + southLat + "," //right bottom
                            + map.getZoom()
                            + "&cluster=yes&format=json"
                            + "&APPID=" + openWeatherMapKey;


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
          geoJSON.features.push(jsonToGeoJson(results.list[i]));
        }
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

//LEAFLET MAP

//tile layers
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//leaflet map
var mymap = L.map('map', {
    center: [-25.363, 131.044],
    zoom: 5,
    layers: [OpenStreetMap_Mapnik]
});

var marker = new L.marker([-25.363, 131.044], {draggable:'true'}).addTo(mymap).bindPopup("Weather Position");

marker.on('dragend', function(event){
    var marker = event.target;
    var position = marker.getLatLng();
    marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
    mymap.panTo(new L.LatLng(position.lat, position.lng));
    console.log((position.lat).toFixed(6), (position.lng).toFixed(6));
    loadWeather((position.lat).toFixed(6)+','+(position.lng).toFixed(6));

  });

//weather layers
var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
    attribution: 'Map data © OpenWeatherMap',
    maxZoom: 18,
    opacity: 0.5
})
var precipitation = L.tileLayer('http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
    attribution: 'Map data © OpenWeatherMap',
    maxZoom: 18,
    opacity: 0.5
})
var pressure = L.tileLayer('http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
    attribution: 'Map data © OpenWeatherMap',
    maxZoom: 18,
    opacity: 0.5
})
var wind = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
    attribution: 'Map data © OpenWeatherMap',
    maxZoom: 18,
    opacity: 0.5
})
var temperature = L.tileLayer('http://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=b52d55bed391bb21898ec822730fcbf3', {
    attribution: 'Map data © OpenWeatherMap',
    maxZoom: 18,
    opacity: 0.5
})


var baseMaps = {
    "Normal": OpenStreetMap_Mapnik,
    "Black & White": OpenStreetMap_BlackAndWhite,
    "Color": Esri_WorldImagery
};

var overlayMaps = {
    "Clouds": clouds,
    "Precipitation":precipitation,
    "Pressure": pressure,
    "Wind": wind,
    "Temperature":temperature,
};


L.control.layers(baseMaps, overlayMaps).addTo(mymap);



//In Meteo View toggling between map and list
$('#toggle_button').click(function(){
    $('#map').toggleClass("hidden");
    $('#mapid').toggleClass("hidden");
    initMap({lat: -25.363, lng: 131.044});
});




