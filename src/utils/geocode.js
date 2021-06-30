const request = require('request')

const geocode = (address, callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+
    '.json?access_token=pk.eyJ1IjoiYWRhbWNvZGUyNiIsImEiOiJja3EyZG15MG0wY2xkMm9sbjZnZHY5b20wIn0.NWFZMG7KRBcq-hFhgR32Yg&limit=1'
    request({ url: url2, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to internet",undefined)
        } 
        else if (response.body.features.length === 0) {
            callback("Please enter valid Location",undefined)
        } 
        else {
            const longitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode