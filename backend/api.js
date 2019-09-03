const CarPositon = require("./controller/CarPositionController.js"); 

var express = require('express');
var app = express();

app.get('/latlon', CarPositon.getLatLon);

app.listen(3000, function() {
  console.log('local server latlon in port :3000!');
});

module.exports = app