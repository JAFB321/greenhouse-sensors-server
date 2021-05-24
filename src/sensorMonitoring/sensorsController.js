const SensorService = require('../database/services/SensorService');
const Sensor = require('../database/models/Sensor');

const ZoneService = require('../database/services/ZoneService');
const Zone = require('../database/models/Zone');

const { DBConsumer } = require('./consumers/DBConsumer');
const sensorService = new SensorService(Sensor.getInstance());
const zoneService = new ZoneService(Zone.getInstance());

class sensorsController {
	constructor() {
		this.QueueConsumer = new DBConsumer();
	}

	async init() {
		await this.QueueConsumer.init();
		await this.QueueConsumer.consume((data) => {
			this.registerSensorRead(data);
		});
	}

	async registerSensorRead(sensorData) {
		try {
			const { sensorID, value } = sensorData;
			if (sensorID !== undefined && value !== undefined) {
				await sensorService.registerSensorRead(sensorID, { value });
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new sensorsController();
