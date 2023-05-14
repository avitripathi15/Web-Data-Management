var Level

function getValues(){
   Level = document.getElementById('level').value
   // console.log(Level);

}
var array =[];
function initialize () {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", "proxy.php?term=restaurant&location=Texas",true);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
         //  console.log(json.businesses[1].name);
          var str = JSON.stringify(json,undefined,2);
         //  console.log(json);
          for(i =0; i<json.businesses.length; i++){
            // console.log(json.businesses[i].name);
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
            array.push(restCard)
         }
         
       }
   };
   
   xhr.send(null);;
   
}

function findRestaurants () {

   var xhr = new XMLHttpRequest();
   var Level = document.getElementById('level').value
   var location = document.getElementById("city").value
   var srch = document.getElementById("srchTerm").value
   let newLocation = searchTerm(location)
   let newTerm = searchTerm(srch)
   xhr.open("GET", "proxy.php?term="+srch+"&location="+newLocation,true);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var businesses = json["businesses"]
          var str = JSON.stringify(json,undefined,2);
          console.log(json,json["businesses"][0]["rating"]);

         //  businesses.sort((a,b) => (parseInt(a["rating"]) > parseInt(b["rating"])) ? 1 : ((parseInt(b["rating"]) > parseInt(a["rating"])) ? -1 : 0));
          businesses.sort((a, b) => (a["rating"] < b["rating"]) ? 1 : -1)
          console.log(businesses.map(a=>a["rating"]))      
          document.getElementById("output").innerHTML="";
          var array="";
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

            // array=array+"<br>"+(i+1)+")"+"<br><b>Name:<a href ='" +json.businesses[i].url+"'></b>"+json.businesses[i].name+"</a>"+"</br><img src='"+json.businesses[i].image_url+"' width= 20% height= 20%></br>"+"<b>Ratings:</b>"
            // +json.businesses[i].rating+"<b>Price:</b>"+json.businesses[i].price+"<b>Postal Address:</b>"+json.businesses[i].location.display_address+"<b>Phone Number</b>"+json.businesses[i].phone;
            
         }
         // document.getElementById("output").appendChild(restCard)
         //  document.getElementById("output").innerHTML = "<pre>" + json.businesses.name + "</pre>";
         //  document.getElementById("output").innerHTML = array;
         // for(i = 0; i<Level;i++)
         // {
         //    console.log(array[i]);
         // }
       }
   };
   
   xhr.send(null);
   
}
function searchTerm(str){
   var newString = str.replace(/[^A-Z0-9]/ig, "+");
   return newString

}
