const request = require('request')

const geocode = (address, callback) => {
    const geocodingURL = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWJyYWRhdSIsImEiOiJjbGp1NXlhbmUweHh5M2tyczVvMmo2bm4zIn0.exoWgDqzX9NAweEpsLid5A'
    request({url: geocodingURL, json: true}, (error, response) => {
        if(error){
            callback('Unable to reach location services')
            console.log(error)
        }else if(response.body.features.length === 0){
            callback('Unable to find location')
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode