let map = L.map('map').setView([51.505, -0.09], 13);
let route = L.polyline([], { color: 'red' }).addTo(map);
let marker = null;
let tracking = false;
let positions = [];
let startRun, finishRun;
let watchId = null;

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const HIGH_ACCURACY = true;
const MAX_CACHE_AGE_MILLISECOND = 30000;
const MAX_NEW_POSITION_MILLISECOND = 5000;

const options = {
    enableHighAccuracy: HIGH_ACCURACY,
    maximumAge: MAX_CACHE_AGE_MILLISECOND,
    timeout: MAX_NEW_POSITION_MILLISECOND,
};

function start() {
    if (navigator.geolocation) {
        tracking = true;
        startRun = new Date();
        watchId = navigator.geolocation.watchPosition(success, error, options);
    } else {
        alert('Geolocation not supported');
    }
}

function stop() {
    tracking = false;
    finishRun = new Date();

    const time = (finishRun - startRun) / 1000;
    const timeMinutes = Math.floor(time / 60);
    const timeSeconds = Math.floor(time % 60);
    console.log(timeMinutes + ' minutes and '  + timeSeconds + ' seconds');

    //Stops the Geolocation tracking
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
}

//Calculate Distance
// function haversineFormula(lat1, lng1, lat2, lng2) {
//     positions = [lat1, lng1, lat2, lng2]
//     if (!tracking) {
//         ((lat1 === lat2) && (lng1 === lng2))
//         return 0 
//     }  else {
//         var radlat1 = Math.PI * lat1/180
//         var radlat2 = Math.PI * lat2/180
//         var theta = lng1 - lng2
//         var radtheta = Math.PI * theta/180
//         var distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//         if (distance > 1) {
//             distance = 1
//         }
// 		distance = Math.acos(distance)
//         distance = distance * 180/Math.PI
//         distance =  distance * 60 * 1.1515
//         return distance
//     }
// }


function success(position) {
    //If tracking is not active, then exit.
    if (!tracking) return;

    //Array that logs the lat and long of the users location.
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const latLong = [lat, lng];
    console.log(latLong)
    
    // Add the new position to the route and positions array
    positions.push(latLong);
    route.addLatLng(latLong);

    // Update marker position
    if (marker) {
        marker.setLatLng(latLong);
    } else {
        marker = L.marker(latLong).addTo(map);
    }

    map.setView(latLong, 15);

}


function error(err) {
    if (err.code === 1) {
        alert("Need geolocation access!");
    } else {
        alert("Cannot get current location.");
    }
}

    // const lat1 = positions.latitude
    // const lng1 = positions.longitude
    // const lat2 = positions.latitude
    // const lng2 = positions.longitude
    // let firstLocation = [lat1, lng1]
    // let secondLocation = [lat2, lng2]
    // let distance

    // getHaversineDistance = (distance) => {
    //     const earthRadius = 6371; // km 
    
    //     const diffLat = (secondLocation.lat-firstLocation.lat) * Math.PI / 180;  
    //     const diffLng = (secondLocation.lng-firstLocation.lng) * Math.PI / 180;  
    
    //     const arc = Math.cos(
    //                     firstLocation.lat * Math.PI / 180) * Math.cos(secondLocation.lat * Math.PI / 180) 
    //                     * Math.sin(diffLng/2) * Math.sin(diffLng/2)
    //                     + Math.sin(diffLat/2) * Math.sin(diffLat/2);
    //     const line = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1-arc));
    
    //     const distance = earthRadius * line; 
    
    //     return distance;
    // }
 