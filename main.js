//Target gallery... https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=c3c461387a95668c70f2321724c5f80f&group_id=2740203%40N20&per_page=10&format=json&nojsoncallback=1

// Flickr REST Request Format (Documentation)
let flickrAPI = "https://api.flickr.com/services/rest/?";

// Photos will be retrieved from a photography group on Flickr
flickrAPI += "&method=flickr.groups.pools.getPhotos";

// Retrieve the key unique to the group
flickrAPI += "&api_key=c3c461387a95668c70f2321724c5f80f";

// Photo Group ID
flickrAPI += "&group_id=2740203%40N20"

// JSON format
flickrAPI += "&format=json";

// Add the callback to properly format the incoming data
flickrAPI += "&nojsoncallback=1";

// Begin AJAX Call
function loadPhotos() {
    var xmlhttp= new XMLHttpRequest();
    xmlhttp.open("GET",flickrAPI,true);   
    xmlhttp.send();

    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let data = JSON.parse(xmlhttp.responseText);
            let items = data.photos.photo;

            //Loop through the JSON data and begin the gallery
            for(let i = 0; i < items.length; i++){
                let item = data.photos.photo[i];
                let farm = item.farm;
                let server = item.server;
                let id = item.id;
                let secret = item.secret;

            //Create unique URLs for each image 
                let src = "http://farm" + item.farm + ".static.flickr.com/" + 
                    item.server + "/" + item.id + "_" + item.secret +".jpg";

                let img = document.createElement("img");
                img.src = src;
                img.width = "300";
                img.height = "250";
                img.id = item.title;
                img.className = "thumbnail";

                //Event listener to begin the gallery
                img.addEventListener("click",  function(e){
                    beginGallery(items)
                }, false);
                document.getElementById("results").appendChild(img); 

            }
        }
    };
};

window.onload = function() {
    loadPhotos();
};

