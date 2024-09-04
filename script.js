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

// Distance Formula Set Up
// getHaversineDistance = (firstLocation, secondLocation) => {
//         const earthRadius = 6371; // km 
    
//         const diffLat = (secondLocation[0] - firstLocation[0]) * Math.PI / 180;  
//         const diffLng = (secondLocation[1] - firstLocation [1]) * Math.PI / 180;  
    
//         const arc = Math.cos(
//                         firstLocation[0] * Math.PI / 180) * Math.cos(secondLocation[0] * Math.PI / 180) 
//                         * Math.sin(diffLng/2) * Math.sin(diffLng/2)
//                         + Math.sin(diffLat/2) * Math.sin(diffLat/2);

//         const line = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1-arc));
    
//         const distance = earthRadius * line; 
    
//         return distance;
//     }

function stop() {
    tracking = false;
    finishRun = new Date();

    const time = (finishRun - startRun) / 1000;
    const timeMinutes = Math.floor(time / 60);
    const timeSeconds = Math.floor(time % 60);
    console.log(timeMinutes + ' minutes and '  + timeSeconds + ' seconds');

    //Calculate Distance in Stop Function
    // let totalDistance = 0
    // for (let i=1; i < positions.length; i++) {
    // }

    //Stops the Geolocation tracking
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
    }

    
}

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
 
    // function haversineFormula(firstLocation, secondLocation) {
//     const earthRad = 6371
   
//     const diffLat = (secondLocation[0] - firstLocation[0]) * Math.PI / 180
//     const diffLng = (secondLocation[1] - firstLocation[1]) * Math.PI / 180

//     const arc = Math.cos(firstLocation[0] * Math.PI / 180) * Math.cos(secondLocation[0] * Math.PI / 180) * Math.sin(diffLng/2) * Math.sin(diffLng/2) +  Math.sin(diffLat/2) * Math.sin(diffLat/2)
    
// }