const net = require('net');

// TCP/IP Server to communicate with the Gateway
class sensorsTCP {
	constructor({ PORT, HOST }) {
		this.PORT = PORT;
		this.HOST = HOST;
		this.serverTCP = net.createServer();
		this.sockets = [];
	}

	init() {
		this.serverTCP.on('connection', (socket) => {
			// Add to connected sockets
			this.sockets.push(socket);

			console.log(`Client connection from: ${socket.remoteAddress}`);
			socket.setEncoding('utf8');

			socket.on('close', () => {
				// Gateway connection closed
				console.log(`Client connection closed: ${socket.remoteAddress}`);
				this.sockets = this.sockets.filter((item) => item !== socket);
			});

			socket.on('error', () => {
				// Gateway connection closed
				console.log(`Client connection error: ${socket.remoteAddress}`);
			});
		});

		this.serverTCP.listen(this.PORT, this.HOST, () =>
			console.log('TCP/IP server running on port 4000')
		);
	}

	onSensorValue(listener = ({ sensorID, value }) => {}) {
		this.sockets.forEach((socket) => {
			socket.on('data', (data) => {
				// Gateway sensor info recieved
				try {
					const sensor = JSON.parse(data);
					if (sensor.sensorID && sensor.value) {
						listener(sensor);
					}
				} catch (error) {}
			});
		});

		this.serverTCP.on('connection', (socket) => {
			socket.on('data', (data) => {
				// Gateway sensor info recieved
				try {
					const sensor = JSON.parse(data);
					if (sensor.sensorID && sensor.value) {
						listener(sensor);
					}
				} catch (error) {}
			});
		});
	}
}

module.exports = sensorsTCP;
