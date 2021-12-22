import { weatherServices } from './weather.service.js'
export const locService = {
    getLocs,
    setNewLoc,
    deleteLoc
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: 24, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, weather: 24, createdAt: new Date(), updatedAt: new Date() }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function setNewLoc(lat, lng) {
    getWeather(lat, lng)
        .then(degree => Math.round(degree - 273.15))
        .then(degree => {
            let time = Date.now();
            locs.push({
                name: prompt('Enter name for location'),
                lat: lat,
                lng: lng,
                weather: degree,
                createdAt: time,
                updatedAt: time
            })
        }),

        console.log(locs)
}

function getWeather(lat, lng) {
    console.log(weatherServices.askWeather(lat, lng))
    return weatherServices.askWeather(lat, lng)
        .then((temp) => temp.main.temp);
}

function deleteLoc(lat, lng) {
    const locIdx = locs.findIndex(loc => lat === loc.lat && lng === loc.lng);
    locs.splice(locIdx, 1);
}