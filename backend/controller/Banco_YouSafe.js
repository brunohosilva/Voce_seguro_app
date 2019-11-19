var mysql = require('mysql');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

exports.connectDataBase = function (req, res) {
    const con = mysql.createConnection({
        host: 'ubuntu@ec2-54-233-130-162.sa-east-1.compute.amazonaws.com',
        user: 'root',
        password: 'yousafe',
        database: 'YouSafe'
    });

    fs.createReadStream('./data/carsteal.csv')
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const resultLatLon = results.map((position) => {
                const latitude = position.LATITUDE.replace(/\,/g, '.')
                const longitude = position.LONGITUDE.replace(/\,/g, '.')
                const rua = position.LOGRADOURO
                if (position.LATITUDE !== null) {
                    console.log(longitude, latitude, rua)
                    con.query("INSERT INTO crimes(latitude,longitude,crime) VALUES(${parseFloat(latitude)},${parseFloat(longitude)},'furto de veiculo')", function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                    })
                }
            })
        })
}