//Create base layer

var myMap = L.map("map", {
  center: [39.82, -98.58],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

//Read JSON file and run function to create markers

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url,create_circles)

//Function to create make
function create_circles(data){

  //Show Objects in console
  console.log("Show Data")
  console.log(data)
  console.log("Features")
  features = data.features
  console.log(features)
   
  //Loop through Data
  for (var i = 0; i < features.length; i++) {
    var response = features[i]
    coordinate = response.geometry.coordinates

    //Write if statement to decide the color
    var colors = "";
      if (response.properties.mag > 4) {
        colors = "red";
      }
      else if (response.properties.mag > 3 ){
        colors = "yellow";
      }
      else {
        colors = "green";
      }

    //Add markers
    circle = L.circle([coordinate[1],coordinate[0]], {

        //Change color based on magnitude
        color: colors,
        fillColor: colors,
        fillOpacity: 0.5,

        //change radius base on depth
        radius: coordinate[2] * 500
    //Add popup
    }).bindPopup("<h2>" + response.properties.place + "</h2> <hr> <h3>Magnitude: " + response.properties.mag + "</h3>").addTo(myMap);  
   }  
  }

