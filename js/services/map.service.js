import { locService } from './loc.service.js';

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocationByName,

}

var gMarker
var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');

    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
        })
        .then(() => {
            gMap.addListener("click", (mapsMouseEvent) => {
                // Create a new InfoWindow.
                let infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,

                });
                const latlng = mapsMouseEvent.latLng.toJSON()
                locService.setNewLoc(latlng.lat, latlng.lng)
                addMarker(latlng)

            });
        })

}


// function initMap(lat = 32.0749831, lng = 34.9120554) {
//     console.log('InitMap');

//     return _connectGoogleApi()
//         .then(() => {
//             console.log('google available');
//             gMap = new google.maps.Map(document.querySelector('#map'), {
//                 center: { lat, lng },
//                 zoom: 15,
//             });
//             console.log('Map!', gMap);
//         })
//         .then(() => {
//             gMap.addListener('click', (mapsMouseEvent) => {
//                 // Create a new InfoWindow.
//                 let infoWindow = new google.maps.InfoWindow({
//                     position: mapsMouseEvent.latLng,
//                 });
//                 const latlng = mapsMouseEvent.latLng.toJSON();
//                 console.dir(mapsMouseEvent);
//                 locService.setNewLoc(latlng.lat, latlng.lng);
//                 addMarker(latlng)
//             });
//         });
// }

function addMarker(loc) {
    if (gMarker) gMarker.setMap(null); // Delete the last marker
    gMarker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return gMarker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve();
    const API_KEY = 'AIzaSyCGH-eko21Y5UNabaohnFmN6d9B5VGfmVk'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load');
    });
}

function getLocationByName(txt) {
    return axios
        .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${txt}&key=AIzaSyCGH-eko21Y5UNabaohnFmN6d9B5VGfmVk`
        )
        .then((loc) => {
            const location = loc.data.results[0].geometry.location
            console.log(loc.data.results[0].geometry.location)
            panTo(location.lat, location.lng);
            addMarker({ lat: location.lat, lng: location.lng })
        })
        .catch((err) => {
            console.log('Cannot get lat/lng', err);
            throw err;
        });

}