const csv = require('csv-parser')
const fs = require('fs')
const results = [];

var express = require('express');
var app = express();

function getLatLon() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./data/data.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        
        const resultLatLon =  results.map((position) => {
          const latlon = {
            "title": "Assalto",
            coordinates: {
              "latitude": parseFloat(position.LATITUDE),
              "longitude": parseFloat(position.LONGITUDE)
            }
          }
          return latlon
        })
        resolve(resultLatLon)
      });
  })
}


app.get('/latlon', async function(req, res) {
  const latlon = await getLatLon()
  res.send(latlon)
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});