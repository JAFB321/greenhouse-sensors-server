const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const sensorsTCP = require('./sensorsTCP');
const { getSensorsLastValues, registerSensorValue } = require('./database');

const app = new express();
const tcpServer = new sensorsTCP({ HOST: 'localhost', PORT: 4000 });
const httpServer = http.createServer(app);
const webSockets = SocketIO().listen(httpServer);

// Websockets
webSockets.on('connection', function (socket) {
	console.log('A user connected');

	socket.on('disconnect', function () {
		console.log('A user disconnected');
	});
});

// Auto send sensor info to clients
setInterval(() => {
	const lastSensors = getSensorsLastValues();
	webSockets.emit('sensor', JSON.stringify(lastSensors));
}, 1000);

// Sensors tcp listen
tcpServer.onSensorValue((sensorInfo) => {
	registerSensorValue(sensorInfo);
});

// Serve public assets
app.use(express.static(__dirname + '/public'));

// Init TCP and http server
httpServer.listen(3000, () => console.log('Http server running on port 3000'));
tcpServer.init();
