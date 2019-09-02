const csv = require('csv-parser')
const fs = require('fs')
const results = [];

var express = require('express');
var app = express();

function getLatLon() {
  return new Promise((res) => {
    fs.createReadStream('./data/data.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const resultLatLon =  results.map((position) => {
          const latitude = position.LATITUDE.replace(/\,/g,'.')
          const longitude = position.LONGITUDE.replace(/\,/g,'.')
          if(position.LATITUDE !== null){
            console.log(position.LATITUDE)
            const latlon = {
              "title": "Furto",
              coordinates: {
                "latitude": parseFloat(latitude),
                "longitude": parseFloat(longitude)
              }
            }
            return latlon
          }        
        })
        res(resultLatLon)
      });
  })
}


app.get('/latlon', async function(req, res) {
  const latlon = await getLatLon()
  res.send(latlon)
});

app.listen(3000, function() {
  console.log('local server latlon in port :3000!');
});