const net = require('net');

// TCP/IP Server to communicate with the Gateway
class sensorsTCP {
	constructor({ PORT }) {
		this.PORT = PORT;
		this.serverTCP = net.createServer();
		this.sockets = [];
	}

	init() {
		this.serverTCP.on('connection', (socket) => {
			// Add to connected sockets
			this.sockets.push(socket);

			console.log(`Client connection from: ${socket.remoteAddress}`);
			socket.setEncoding('utf8');
			socket.setNoDelay(true);

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

		this.serverTCP.listen(this.PORT, () => console.log('TCP/IP server running on port 4000'));
	}

	onSensorValue(listener = ({ sensorID, value }) => {}) {
		this.sockets.forEach((socket) => {
			socket.on('data', (data) => {
				// Gateway sensor info recieved
				console.log(data);
				try {
					const sensor = JSON.parse(data);
					if (sensor.sensorID !== undefined && sensor.value !== undefined) {
						listener(sensor);
					}
				} catch (error) {
					// console.log(error);
				}
			});
		});

		this.serverTCP.on('connection', (socket) => {
			socket.on('data', (data) => {
				console.log(data);
				// Gateway sensor info recieved
				try {
					const sensor = JSON.parse(data);
					if (sensor.sensorID !== undefined && sensor.value !== undefined) {
						listener(sensor);
					}
				} catch (error) {
					console.log(error);
				}
			});
		});
	}
}

module.exports = sensorsTCP;
