import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
export const controller = {
    onGetLocs,
    onGoToLoc
}

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGoToLoc = onGoToLoc;
window.onDeleteLoc = onDeleteLoc;
window.onGetLink = onGetLink;

window.onSearchLocation = onSearchLocation;

function onInit() {
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready');
            onGetLocs()
        })
        .catch(() => console.log('Error: cannot init map'));

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(urlSearchParams)
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function onAddMarker(lat = 32.0749831, lng = 34.9120554) {
    console.log('Adding a marker');
    mapService.addMarker({ lat, lng });
}

function onGetLocs() {
    locService.getLocs().then((locs) => {
        const strHtmls = locs.map((loc) => {
            return `<tr>
        <td class="name">${loc.name}</td>
        <td class="name">${loc.weather}°</td>
        <td><button onclick="onGoToLoc(${loc.lat},${loc.lng})">go</button></td>
        <td><button onclick="onDeleteLoc(${loc.lat},${loc.lng})">delete</button></td>
    </tr>`
        });
        document.querySelector('.locs-container').innerHTML = strHtmls.join('');
    });
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords);
            document.querySelector(
                '.user-pos'
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
        })
        .catch((err) => {
            console.log('err!!!', err);
        });
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onGoToLoc(lat, lng) {
    mapService.panTo(lat, lng)
}

function onDeleteLoc(lat, lng) {
    locService.deleteLoc(lat, lng);
    onGetLocs();
}

function onGetLink() {
    locService.getLocs()
        .then((locs) => {
            var url = new URL("https://ofekbb.github.io/traveltip/");
            url.searchParams.append(locs[locs.length - 1].lat, locs[locs.length - 1].lng);
            console.log(url.href)
            return url
        })
}


function onSearchLocation(ev) {
    ev.preventDefault();
    console.log(ev.target[0].value);
    mapService.getLocationByName(ev.target[0].value);
}

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCGH-eko21Y5UNabaohnFmN6d9B5VGfmVk