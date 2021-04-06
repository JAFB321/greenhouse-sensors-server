const http = require('http');
const SocketIO = require('socket.io');
const express = require('express');

const app = new express();
const httpServer = http.createServer(app);
const io = SocketIO().listen(httpServer);

// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

io.on('connection', function (socket) {
	console.log('A user connected');

	//Whenever someone disconnects this piece of code executed
	socket.on('disconnect', function () {
		console.log('A user disconnected');
	});

	socket.emit('message', 'TEST');
});

app.use(express.static(__dirname + '/public'));

httpServer.listen(3000, () => console.log('Http server running on port 3000'));

const { sensorsTCP } = require('./sensorsTCP');

const tcp = new sensorsTCP({ HOST: 'localhost', PORT: 4000 });

tcp.init(({ sensorID, value }) => {
	console.log(`${sensorID}: ${value} \n`);
});
