const csv = require('csv-parser')
const fs = require('fs')
const results = [];

var express = require('express');
var app = express();

fs.createReadStream('data.csv')
  .pipe(csv({separator: ';'}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    results.map((x) => {
      const latlon = [{
        "title": "Assalto",
        coordinates:{
          "latitude": x.LATITUDE,
          "longitude": x.LONGITUDE
        }
      }]
    })
  });

app.get('/latlon', function (req, res) {
  res.send(latlon);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log(latlon)
});