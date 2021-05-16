const SensorService = require('../database/services/SensorService');
const Sensor = require('../database/models/Sensor');

const sensorService = new SensorService(Sensor.getInstance());

class sensorsController {
	constructor() {}

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
