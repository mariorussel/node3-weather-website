const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=61b04564d74c222d60db6dbb5599517f&query=' 
				+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

	
	request({ url, json: true}, (error, { body }) => {
		if (error) {
			callback('Unnable to connect to Weather Stack service!', undefined)
		} else if (body.error) {
			callback('Unable to find out the current weather. Try another one', undefined)
		} else {
			callback(undefined, {
				weather_descriptions: body.current.weather_descriptions[0] + 'It is currently ' 
										+ body.current.temperature +
				 						' degrees out. It feels like ' + body.current.feelslike
			})
		}
	})
}

module.exports = forecast