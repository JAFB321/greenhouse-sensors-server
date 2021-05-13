require('dotenv').config();
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const cors = require('cors');
const sensorsTCP = require('./gateway/sensorsTCP');
const ConnectionDB = require('./database/Connection');
const apiRoutes = require('./api/routes/index');
const SocketsController = require('./sockets/socketsController');

// Mongo Database
const { DB_URL, DB_NAME, DB_USER, DB_PASS } = process.env;

new ConnectionDB({
	URL: DB_URL || 'mongodb+srv://@cluster0.pwji2.mongodb.net',
	dbName: DB_NAME,
	user: DB_USER,
	pass: DB_PASS,
}).Connect();

// ------ HTTP Server ------------------------
const app = express();
const httpServer = http.createServer(app);

// JWT Token secret
app.set('JWT_SECRET_KEY', process.env.JWT_SECRET_KEY || 'TEAM4');
// Middlewares
app.use(express.json());
app.use(cors());
// Api Routes
app.use('/api', apiRoutes);

// ------ Websockets ------------------------
const webSockets = SocketIO(httpServer, {
	cors: {
		origin: '*',
	},
});

const socketsController = new SocketsController(webSockets);

// ------ TCP Server ------------------------
const tcpServer = new sensorsTCP({ PORT: process.env.TCP_PORT || 4000 });
const gatewayController = require('./gateway/gatewayController');

// Sensors tcp listen
tcpServer.onSensorValue((sensorInfo) => {
	gatewayController.registerSensorRead(sensorInfo);
});

// Init TCP and http server
const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`Http server running on port ${port}`));
tcpServer.init();
