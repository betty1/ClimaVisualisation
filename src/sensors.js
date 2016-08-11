var five = require('johnny-five');
var board = new five.Board();

var sensorSetup = function (io) {

io.on('connection', function (socket) {

  board.on("ready", function() {

    console.log("Board ready.");

    // Temperature
    var temp = new five.Temperature({
      pin: "A4",
      controller: "TMP36",
      freq: 250
    });

    temp.on("change", function() {
      console.log("Temp: " + this.celsius);

      io.emit('updateTemp', this.celsius)
    });

    // Light
    var light = new five.Sensor({
      pin: "A0",
      freq: 250
    });

    light.on("change", function(value) {
      console.log("Light: " + value);

      io.emit('updateLight', value)
    });

    // Humidity
    var humidity = new five.Sensor({
      pin: "A2",
      freq: 250
    });

    humidity.on("change", function(value) {
      console.log("Humid: " + value);

      io.emit('updateHumid', value)
    });

  });

  socket.on('registered', function (data) {
    console.log("Client registered."); 

    socket.on('disconnect', function (payload) {
      // delete phoneData[userid];
      // io.emit('stats', phoneData);
    });
  });
});
};