var express = require('express');
var app = express();

const latlon = [
  { latitude: 49.986111, longitude: 20.061667 },
  { latitude: 50.193139, longitude: 20.288717 },
  { latitude: 49.740278, longitude: 19.588611 },
  { latitude: 50.061389, longitude: 19.938333 },
  { latitude: 50.174722, longitude: 20.986389 },
  { latitude: 50.064507, longitude: 19.920777 },
];

app.get('/latlon', function (req, res) {
  res.send(latlon);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});