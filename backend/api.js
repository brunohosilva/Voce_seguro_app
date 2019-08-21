var express = require('express');
var app = express();

const latlon =[{
  title: 'Houve um assalto aqui!!',
  coordinates: {
    latitude: -23.175993,
    longitude: -45.8565098
  },
},
{
  title: 'Houve um assalto aqui!!',
  coordinates: {
    latitude: -23.1745971,
    longitude: -45.8547501
  },  
}]

app.get('/latlon', function (req, res) {
  res.send(latlon);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log(latlon)
});