const csv = require('csv-parser')
const fs = require('fs')
const results = [];

exports.getLatLon = function(req, res) {
  fs.createReadStream('./data/data.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const resultLatLon = results.map((position) => {
        const latitude = position.LATITUDE.replace(/\,/g, '.')
        const longitude = position.LONGITUDE.replace(/\,/g, '.')
        if (position.LATITUDE !== null) {
          const latlon = {
            "title": "Furto",
            coordinates: {
              "latitude": parseFloat(latitude),
              "longitude": parseFloat(longitude)
            }
          }
          console.log(latlon)
          return latlon
        }
      })
      res.send(resultLatLon)
    });
}
