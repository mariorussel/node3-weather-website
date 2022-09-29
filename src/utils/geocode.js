const request = require('request')

const geocode = (address, callback) => {
	const url = 'http://api.positionstack.com/v1/forward?access_key=a052c1bcfead2fdd6ee9b42f8d36e926&query=' 
					+ encodeURIComponent(address) + '&country=US&limit=1'
	
	request({ url, json: true}, (error, { body }) => {
		if (error) {
			callback('Unnable to connect to position stack service!', undefined)
		} else if (body.data.length === 0) {
			callback('Unable to find location. Try another one', undefined)
		} else {
			callback(undefined, {
				latitude: body.data[0].latitude,
				longitude: body.data[0].longitude,
				location: body.data[0].label
			})
		}
	})
}

module.exports = geocode