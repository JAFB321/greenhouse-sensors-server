// const http = require('http');
// const SocketIO = require('socket.io');
// const express = require('express');

// const app = new express();
// const httpServer = http.createServer(app);
// const io = SocketIO().listen(httpServer);

// app.use(express.static(__dirname + '/public'));

// httpServer.listen(3000, () => console.log('Http server running on port 3000'));

require('./sensorServer');
