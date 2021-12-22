export const weatherServices = {
    askWeather
}
const W_KEY = 'fd2d597ad8c4e339ca812754c66abe43'

function askWeather(lat, lng) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${W_KEY}`)
        .then(users => {
            return users.data
        })
        .catch(err => {
            console.log('Cannot get temp', err);
            throw err
        })
}