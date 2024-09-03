let map = L.map('map').setView([51.505, -0.09], 13);
let route = null
let marker = null
let tracking = false;
let positions = []
let startRun, finishRun


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const HIGH_ACCURACY = true;
const MAX_CHACHE_AGE_MILLISECOND = 30000;
const MAX_NEW_POSITION_MILLISECOND = 5000

const options = {
    enableHighAccuracy: HIGH_ACCURACY,
    maximumAge: MAX_CHACHE_AGE_MILLISECOND,
    timeout: MAX_NEW_POSITION_MILLISECOND,
}

function start() {
    if (navigator.geolocation) {
        tracking = true
        startRun = new Date()
        navigator.geolocation.watchPosition(success, error, options)
    } else {
        alert ('Geolocation not supported')
    }
}

function stop () {
    tracking = false
    finishRun = new Date()

    const time = (finishRun - startRun) / 1000

    // let distance = 0;
    // for (let i = 1; i < positions.length; i++) {
    //     const lineDistance = calculateDistance(positions[i - 1], positions[i])
    //     console.log(`Distance between position ${i-1}  and ${i}: ${lineDistance} meters`)
    //     distance += lineDistance
    // }

    const timeMinutes = Math.floor(time / 60)
    const timeSeconds = Math.floor(time % 60)
    console.log(timeMinutes + ' minutes and '  + timeSeconds + ' seconds')
    // console.log(`Total distance: ${distance.toFixed(2)} meters`)
}

function updateMap(position) {
    if (tracking) {
        const latLong = [position.coords.latitude, position.coordslongitude]
    }

    if(positions.length > 0) {
        const lastPos = positions[positions.length - 1]
        const distanceLastPos = calculateDistance(lastPos, latLong)

        if (distanceLastPos > 1)
            positions.push(latLong)
            route.addLatLng(latLong)
            map.setView(latLong, 15)
    } else {
        positions.push(latLong)
        route.addLatLng(latLong)
        map.setView(latLong, 15)
    }
}


function success(position) {

    const lat1 = position.coords.latitude
    const lng1 = position.coords.longitude
    const lat2 = position.coords.latitude
    const lng2 = position.coords.longitude
    const latlngs = [[lat1, lng2], [lat2, lng2]]

    if(marker) {
        map.removeLayer(marker);
        map.removeLayer(route);
    }

    marker = L.marker([lat1, lng1]).addTo(map);
    route = L.polyline([latlngs], {color: 'red'}).addTo(map)

    map.fitBounds(route.getBounds())
}



// function haversineFormula() {

// }

function error(err) {
    if (err.code === 1) {
        alert("Need geolocation access!")
    } else {
        alert("Cannot get current location.")
    }
}


 