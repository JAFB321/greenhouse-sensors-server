const SensorService = require('../api/services/SensorService');
const Sensor = require('../api/models/Sensor');

const sensorService = new SensorService(Sensor.getInstance());

class gatewayController {
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

module.exports = new gatewayController();
