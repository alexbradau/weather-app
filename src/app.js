const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Define public directory for static content
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Alex Bradau'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Alex Bradau'
    })
})

app.get('/help', (req,res) => {
    res.render('about', {
        title: 'Help Page',
        message: 'What can I help you with?',
        author: 'Alex Bradau'
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.search
    if(!address){
        return res.send({
            error: 'Must include a search address'
        })
    }else{
        geocode(address, (geoError, {latitude, longitude, location} = {}) => {
            if(geoError){
                return res.send({
                    error: geoError
                })
            }

            console.log(location + ' Latitude/Longitude coordinates')
            forecast(latitude, longitude, (forecastError, {temperature, precipitation}) => {
                if(forecastError){
                    return res.send({
                        error: forecastError
                    })
                }
                res.send({
                    address: address,
                    location: location,
                    latitude: latitude,
                    longitude: longitude,
                    temperature: temperature,
                    precipitation: precipitation
                })
                console.log('It is currently ' + temperature + ' degrees Celsius with a ' + precipitation + '% chance of rain in ' + location)
            })
        })

    }
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: ''
    })
})

app.listen(port, () => console.log('Server listening on port ' + port))