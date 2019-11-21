var mysql = require('mysql');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];


exports.getLatLonCarSteal = function(req, res) {
  const con = mysql.createConnection({
    host: 'yousafe-db.cyob7khpg6i0.sa-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'yousafe123',
    database: 'YouSafe'
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT latitude,longitude FROM crimes WHERE crime = 'furto de veiculo'", function(err, result, fields) {
      if (err) throw err;
      const resultLatLon = result.map((position) => {
        const latitude = position.latitude
        const longitude = position.longitude
        const latlon = {
          "title": "Furto de Carro",
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