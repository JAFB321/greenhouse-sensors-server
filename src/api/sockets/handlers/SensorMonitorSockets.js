const ZoneService = require('../../../database/services/ZoneService');
const Zone = require('../../../database/models/Zone');
const { checkHealth } = require('../../../database/helpers/ZoneHelpers');

const { WebSocketsConsumer } = require('../../../sensorMonitoring/consumers/WebSocketsConsumer');

class SensorsState {
	constructor(expireTime) {
		this.expireTime = expireTime;

		this.sensors = {
			'example-sensor': {
				value: 1,
			},
		};
	}

	setSensor(name, value) {
		this.sensors[name] = {
			value,
			oldValue: this.sensors[name]?.value,
			timestamp: Date.now(),
		};
	}

	getSensor(name) {
		if (this.sensors[name] !== undefined) {
			const { value, timestamp, oldValue } = this.sensors[name];

			if (Date.now() - timestamp <= this.expireTime) {
				return {
					name,
					value,
					oldValue,
				};
			} else {
				return {
					name,
					oldValue,
				};
			}
		}
	}
}

class SensorMonitorSockets {
	constructor() {
		this.zoneService = new ZoneService(Zone.getInstance());
		this.sensorsState = new SensorsState(4000);

		// Init queue to recieve messages
		this.QueueConsumer = new WebSocketsConsumer();
		this.initQueue();
	}

	async handleSocket(socket) {
		socket.on('socket_zone_set', async (data) => {
			try {
				socket.zone = JSON.parse(data.toString());
				const { zoneId } = socket.zone;
				console.log(zoneId);
				if (zoneId) {
					socket.SenderInterval = setInterval(async () => {
						try {
							const { data } = await this.zoneService.get(zoneId);
							console.log(data);
							if (data) {
								const { sensors } = data;

								const updatedSensors = sensors.map(({ name, _id }) => ({
									...this.sensorsState.getSensor(name),
									name,
									_id,
								}));

								socket.emit('SensorMonitor', JSON.stringify(updatedSensors));
							}
						} catch (error) {
							console.log(error);
						}
					}, 4000);
				}
			} catch (error) {
				console.log(error);
			}
		});

		socket.on('socket_warning_register', async (data) => {
			try {
				if (socket.zone && data) {
					const { sensorId, plantId } = JSON.parse(data.toString());

					const done = await this.zoneService.registerWarning(socket.zone._id, {
						sensorId,
						plantId,
					});
					console.log(done);
				}
			} catch (error) {}
		});

		socket.on('disconnect', () => {
			clearInterval(socket.SenderInterval);
		});
		socket.on('error', () => {});
	}

	async consumeSensorData(data) {
		try {
			const { sensorID, value } = JSON.parse(data);
			this.sensorsState.setSensor(sensorID, value);
			// console.log(this.sensorsState.getSensor(sensorID));
		} catch (error) {}
	}

	async initQueue() {
		await this.QueueConsumer.init();
		await this.QueueConsumer.consume((data) => {
			this.consumeSensorData(data);
		});
	}
}

module.exports = { SensorMonitorSockets };
