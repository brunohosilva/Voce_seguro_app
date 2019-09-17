var mysql = require('mysql');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];


exports.getLatLonPhoneRob = function (req, res) {
  const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'youSave'
  });

  con.connect(function (err) {
    con.query("SELECT latitude,longitude FROM crimes", function (err, result, fields) {
      const resultLatLon = result.map((position) => {
        const latitude = position.latitude
        const longitude = position.longitude
        const latlon = {
          "title": "Roubo de Celular",
          coordinates: {
            "latitude": parseFloat(latitude),
            "longitude": parseFloat(longitude)
          }
        }
        return latlon
      })
      res.send(resultLatLon);
    });
  });
}
