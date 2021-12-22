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
    let time = new Date();
    locs.push({
        name: prompt('Enter name for location'),
        lat: lat,
        lng: lng,
        weather: 24,
        createdAt: time,
        updatedAt: time
    })
    console.log(locs)
}

function deleteLoc(lat,lng){
   const locIdx =  locs.findIndex(loc => lat === loc.lat && lng === loc.lng);
   locs.splice(locIdx,1);
}