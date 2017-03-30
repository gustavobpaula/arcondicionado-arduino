var five = require("johnny-five");
var board = new five.Board();
var express = require("express");
var app = express();
var temp;

board.on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A1"
  });

  temperature.on("change", function() {
    console.log(this.celsius + "°C", this.fahrenheit + "°F");
    temp = this;
  });
});

app.all('/*', function(req, res, next) {
  //Cors headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //Set custom header for cors
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,x-requested-with');
  if(req.method == 'OPTIONS') {
    res.status(200).end();
  }else {
    next();
  }
});

app.get('/', function(req, res){
  res.send('temperatura');
});

app.get('/temperatura', function(req, res){
  res.send(temp.celsius + '°C');
});

var server = app.listen('https://nameless-wave-78170.herokuapp.com/');
console.log('Servidor Express iniciado na porta %s', server.address().port);

