const SensorService = require('../api/services/SensorService');
const Sensor = require('../api/models/Sensor');

const sensorService = new SensorService(Sensor.getInstance());

class SocketsController {
	constructor(socketsIO) {
		this.socketsIO = socketsIO;

		socketsIO.on('connection', function (socket) {
			console.log('A user connected');

			socket.on('disconnect', function () {
				console.log('A user disconnected');
			});

			socket.on('error', (error) => {
				console.log(error);
			});
		});

		// Auto send sensor info to clients
		setInterval(() => {
			this.sendSensorsInfo();
		}, 1000);
	}

	async sendSensorsInfo() {
		try {
			const items = await sensorService.getAll({});

			if (items && items.data && items.data.length) {
				this.socketsIO.emit('sensorsData', JSON.stringify(items.data));
			}
		} catch (error) {}
	}
}

module.exports = SocketsController;
