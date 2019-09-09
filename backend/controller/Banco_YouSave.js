var mysql = require('mysql');

exports.connectDataBase = function (req, res) {
  const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'youSave'
  });

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT latitude,longitude FROM crimes", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
}