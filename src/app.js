const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Mario'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Mario'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		message: 'Heeeeeellpp',
		name: 'Mario'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!'
		})
	}


	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		}

			forecast(latitude,longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}
	
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		  })
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query.search)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 Help Page',
		name: 'Mario',
		errorMessage: 'Help article not found.'
	})
})


app.get('*', (req, res) => {
	res.render('404', {
		title: '404 Page',
		name: 'Mario',
		errorMessage: 'Page not found.'
	})
})



app.listen(port, () => {
	console.log('Server is up on port ' + port)
})



///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////// Till the video number 54 - Challenge 1
//
// Goal: Wire up /weather
//
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location


///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////// Till the video number 54 - Challenge 1
//
// Goal: Update weather endpoint to accept address
//
// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
//    - Add address property onto JSON which returns the provide address
// 3. Test weather and /weather?address=philadelphia