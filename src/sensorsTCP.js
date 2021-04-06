const net = require('net');

// TCP/IP Server to communicate with the Gateway

class sensorsTCP {
	constructor({ PORT, HOST }) {
		this.PORT = PORT;
		this.HOST = HOST;
		this.serverTCP = net.createServer();
	}

	init(onSensorValue = ({ sensorID, value }) => {}) {
		this.serverTCP.on('connection', (socket) => {
			console.log(`Client connection from: ${socket.remoteAddress}`);
			socket.setEncoding('utf8');

			socket.on('data', (data) => {
				// Gateway sensor info recieved
				try {
					const sensor = JSON.parse(data);
					if (sensor.sensorID && sensor.value) {
						onSensorValue(sensor);
					}
				} catch (error) {}
			});

			socket.on('close', () => {
				// Gateway connection closed
				console.log(`Client connection closed: ${socket.remoteAddress}`);
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
}

module.exports = { sensorsTCP };
