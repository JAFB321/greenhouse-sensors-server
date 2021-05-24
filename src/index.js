require('dotenv').config();
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const cors = require('cors');
const ConnectionDB = require('./database/Connection');
const apiRoutes = require('./api/routes/index');
const SocketsController = require('./api/sockets/socketsController');
const SensorsController = require('./sensorMonitoring/SensorsController');

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

app.options('*', cors());
app.use(
	cors({
		credentials: true,
		preflightContinue: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		origin: '*',
	})
);

// Api Routes
app.use('/api', apiRoutes);

// ------ Websockets ------------------------
const webSockets = SocketIO(httpServer, {
	cors: {
		origin: '*',
	},
});

const socketsController = new SocketsController(webSockets);

// ------ Sensor Monitoring ------
SensorsController.init();

const { MailSender } = require('./notificationManager/mailSender');
const mail = new MailSender({ user: 'juanguzmansalazar@gmail.com', pass: 'sjyzsuhcaeeblkwz' });

(async () => {
	await mail.init();
	await mail.sendEmail({
		from: 'juanguzmansalazar@gmail.com',
		to: 'jafb321@gmail.com',
		subject: 'fuck you',
		html: '<p></p>',
	});
})();

// Init Http Server
const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`Http server running on port ${port}`));
