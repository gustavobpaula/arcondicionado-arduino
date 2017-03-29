var five = require("johnny-five");

five.Board({ port: "COM3" }).on("ready", function() {
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A1"
  });

  var celsius = 0;

  temperature.on("change", function() {
    celsius = this.celsius;
    //console.log(this.celsius + "°C", this.fahrenheit + "°F");
  });

  setInterval(function(){
    console.log(celsius + "°C");
  }, 1000);
});
