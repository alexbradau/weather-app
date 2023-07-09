const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=38c2445e6f2018034760205cf3b9ad4b&query=' + longitude + ',' + latitude
    request({url: url, json: true}, (error, response) => {
        if(error){
            console.log('Unable to reach weather services')
        }else{
            callback(undefined, {
                temperature: response.body.current.temperature,
                precipitation: response.body.current.precip
            })
        }
    })
}

module.exports = forecast