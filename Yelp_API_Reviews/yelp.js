let gMapsMarkers = [];
var map;
var gMapsMarker;
var gMapsBound;
// var geocoder = new google.maps.Geocoder();

// function initialize () {
// };


function initialize(){
   var opt = {
      zoom: 16,
      center: {lat:32.75, lng:-97.13}
   }
   map = new google.maps.Map(document.getElementById("gMaps"), opt);
    
 }



 function gMapsDeleteMarker(){
   gMapsHideMarker();
   gMapsMarkers = [];
}


function gMapsMarker(location_values){
   gMapsBound = new google.maps.LatLngBounds();
   
   for(index=0;index<location_values.businesses.length; index++){
      
      var mapsLongitutde=location_values.businesses[index].coordinates.longitude
      var mapsLatitude=location_values.businesses[index].coordinates.latitude
      var c=index+1;
      var gMapsMarker = new google.maps.Marker({
      position: {lat:mapsLatitude, lng:mapsLongitutde},
      title: c+")"+ location_values.businesses[index].name,
      map:map  
      
   });
   gMapsMarkers.push(gMapsMarker);
   gMapsBound.extend({lat:mapsLatitude, lng:mapsLongitutde});
   }
   map.fitBounds(gMapsBound);
}


function gMapsHideMarker(){
   setMapOnAll(null);
}


//https://developers.google.com/maps/documentation/javascript/examples/marker-remove#maps_marker_remove-javascript 
function setMapOnAll(map){
for(var index=0; index<gMapsMarkers.length; index++){
   gMapsMarkers[index].setMap(map);
}
}



function findRestaurants () {
   gMapsDeleteMarker();
   var xhr = new XMLHttpRequest();
   var Level = 10;
   var srch = document.getElementById("srchTerm").value
   let newTerm = searchTerm(srch)

   latt =  map.getCenter().lat();
   long = map.getCenter().lng();
   
   console.log("latitude=" , latt);
   console.log("longitude=", long);
   // var city = address(lat,long)
   
   // frame = new google.maps.geometry.spherical.computeDistanceBetween(bounds.getNorthEast(), bounds.getCenter())
   // console.log(frame);


   // console.log("map range = ", bounds);
   xhr.open("GET", "proxy.php?term="+newTerm+"&location=Arlington+Texas&limit=10",true);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var businesses = json["businesses"]
          var str = JSON.stringify(json,undefined,2);
          

         //  businesses.sort((a,b) => (parseInt(a["rating"]) > parseInt(b["rating"])) ? 1 : ((parseInt(b["rating"]) > parseInt(a["rating"])) ? -1 : 0));
          businesses.sort((a, b) => (a["rating"] < b["rating"]) ? 1 : -1)
          console.log(businesses.map(a=>a["rating"]))      
          
          for(i =0; i<Level; i++){

            const restCard = document.createElement('div')
            const restCardImg = document.createElement('div')
            const restCardR = document.createElement('div')
            const restCardP = document.createElement('div')
            const restCardPa = document.createElement('div')
            const restCardPh = document.createElement('div')

            restCard.innerHTML = "<br>"+(i+1)+")"+"<br><b>Name:<a href ='" +json.businesses[i].url+"'></b>" + json.businesses[i].name
            restCardImg.innerHTML= "</br><img src='"+json.businesses[i].image_url+"' width= 40% height= 40%></br>"
            restCardR.innerHTML = "<b>Ratings:</b>"+json.businesses[i].rating
            restCardP.innerHTML = "<b>Price:</b>"+json.businesses[i].price
            restCardPa.innerHTML = "<b>Postal Address:</b>"+json.businesses[i].location.display_address
            restCardPh.innerHTML = "<b>Phone Number</b>"+json.businesses[i].phone

            restCard.appendChild(restCardImg)
            restCard.appendChild(restCardR)
            restCard.appendChild(restCardP)
            restCard.appendChild(restCardPa)
            restCard.appendChild(restCardPh)
            
            document.getElementById("output").appendChild(restCard)            
         }
         gMapsMarker(json);
       }
   };
   
   xhr.send(null);
   
}
function searchTerm(str){
   var newString = str.replace(/[^A-Z0-9]/ig, "+");
   return newString

}

// function address(latt,long){
//    var  addr;
//    console.log(lat,long);
//    const latlang = { lat: latt, lng: long};
//    geocoder
//     .geocode({ location: latlng })
//     .then((response) => {
//       if (response.results[0]) {
//         map.setZoom(16);

//         const marker = new google.maps.Marker({
//           position: latlng,
//           map: map
//          });
//         addr = response.results[0].formatted_address;
//       }
//     } 
// }
