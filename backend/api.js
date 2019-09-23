const CarSteal = require("./controller/CarStealController.js"); 
const CarRob = require("./controller/CarRobController.js"); 
const PhoneSteal = require("./controller/PhoneStealController.js");
const PhoneRob = require("./controller/PhoneRobController.js"); 
const database = require("./controller/Banco_YouSave.js");

var express = require('express');
var app = express();


app.get('/latlonCarSteal', CarSteal.getLatLonCarSteal);
app.get('/latlonCarRob', CarRob.getLatLonCarRob);
app.get('/latlonPhoneSteal', PhoneSteal.getLatLonPhoneSteal);
app.get('/latlonPhoneRob', PhoneRob.getLatLonPhoneRob);
<<<<<<< HEAD
app.get('/dataBaseConnection', database.connectDataBase);
=======

>>>>>>> 71586076649de7f11581139ba3e6e44565823db7

app.listen(3000, function() {
  console.log('local server in port :3000!');
});

module.exports = app