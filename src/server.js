// Setting up Restify and Socket.io
var restify = require('restify'),
    socketio = require('socket.io'),
    server = restify.createServer(),
    io = socketio.listen(server.server),
	  uuid = require('node-uuid');

// for retrieving full responses
server.use(restify.fullResponse())

routeSetup();

sensorSetup();

// Listening to the port
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
  console.log("########################");
});

io.on('connection', function (socket) {

  // React to client connection/disconnection
  socket.on('registered', function (data) {
    console.log("Client registered."); 

    socket.on('disconnect', function (payload) {
        console.log("Client disconnected."); 
    });
  });
});

// Setup of temperature, light and humidity sensor
// Pins:
// A0: Humidity
// A2: Temperature
// A4: Light
function sensorSetup(){

  var five = require('johnny-five');
  var board = new five.Board();

  board.on("ready", function() {

    console.log("Board ready.");

    // Humidity
    var humidity = new five.Sensor({
      pin: "A0",
      freq: 250
    });

    humidity.on("change", function(value) {
      console.log("Humid: " + value);

      io.emit('updateHumid', value)
    });

    // Temperature
    var temp = new five.Temperature({
      pin: "A2",
      controller: "TMP36",
      freq: 250
    });

    temp.on("change", function() {
      console.log("Temp: " + this.celsius);

      io.emit('updateTemp', this.celsius)
    });

    // Light
    var light = new five.Sensor({
      pin: "A4",
      freq: 250
    });

    light.on("change", function(value) {
      console.log("Light: " + value);

      io.emit('updateLight', value)
    });
  });
}

// Setup of Restify routes
function routeSetup(){

server.get('/live', restify.serveStatic({
  directory: './public/',
  file: 'room.html'
}));

server.get('/stats', restify.serveStatic({
  directory: './public/',
  file: 'stats.html'
}));

server.get('/helper/Detector.js', restify.serveStatic({
  directory: './helper/',
  file: 'Detector.js'
}));

server.get('/helper/EffectComposer.js', restify.serveStatic({
  directory: './helper/',
  file: 'EffectComposer.js'
}));

server.get('/helper/RenderPass.js', restify.serveStatic({
  directory: './helper/',
  file: 'RenderPass.js'
}));

server.get('/helper/ShaderPass.js', restify.serveStatic({
  directory: './helper/',
  file: 'ShaderPass.js'
}));

server.get('/helper/Fire.js', restify.serveStatic({
  directory: './helper/',
  file: 'Fire.js'
}));

server.get('/helper/FireShader.js', restify.serveStatic({
  directory: './helper/',
  file: 'FireShader.js'
}));

server.get('/libs/perlin.js', restify.serveStatic({
  directory: './libs/',
  file: 'perlin.js'
}));

server.get('/libs/three.js', restify.serveStatic({
  directory: './libs/',
  file: 'three.js'
}));

server.get('/TestShader.js', restify.serveStatic({
  directory: './public/',
  file: 'TestShader.js'
}));

server.get('/textures/px.jpg', restify.serveStatic({
  directory: './public/textures/',
  file: 'px.jpg'
}));

server.get('/textures/nx.jpg', restify.serveStatic({
  directory: './public/textures/',
  file: 'nx.jpg'
}));

server.get('/textures/py.jpg', restify.serveStatic({
  directory: './public/textures/',
  file: 'py.jpg'
}));

server.get('/textures/ny.jpg', restify.serveStatic({
  directory: './public/textures/',
  file: 'ny.jpg'
}));

server.get('/textures/pz.jpg', restify.serveStatic({
  directory: './public/textures/',
  file: 'pz.jpg'
}));

server.get('/textures/nz.jpg', restify.serveStatic({
  directory: './public/textures/',
  file: 'nz.jpg'
}));

server.get('/textures/firetexture.png', restify.serveStatic({
  directory: './public/textures/',
  file: 'firetexture.png'
}));

}

