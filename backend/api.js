const CarSteal = require("./controller/CarStealController.js"); 
const CarRob = require("./controller/CarRobController.js"); 
const PhoneSteal = require("./controller/PhoneStealController.js");
const PhoneRob = require("./controller/PhoneRobController.js"); 
const database = require("./controller/Banco_YouSafe");

var express = require('express');
var app = express();

app.get('/dataBaseConnection', database.connectDataBase);
app.get('/latlonCarSteal', CarSteal.getLatLonCarSteal);
app.get('/latlonCarRob', CarRob.getLatLonCarRob);
app.get('/latlonPhoneSteal', PhoneSteal.getLatLonPhoneSteal);
app.get('/latlonPhoneRob', PhoneRob.getLatLonPhoneRob);


app.listen(3000, function() {
  console.log('local server in port :3000!');
});

module.exports = app