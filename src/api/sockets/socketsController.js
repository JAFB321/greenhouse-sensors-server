const { SensorMonitorSockets } = require('./handlers/SensorMonitorSockets');

const sensorsMonitor = new SensorMonitorSockets();

class SocketsController {
	constructor(socketsIO) {
		// SocketsIO
		this.socketsIO = socketsIO;

		socketsIO.on('connection', async (socket) => {
			sensorsMonitor.handleSocket(socket);
		});
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
