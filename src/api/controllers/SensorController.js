const Controller = require('./Controller');
const SensorService = require('../services/SensorService');
const Sensor = require('../models/Sensor');

const sensorService = new SensorService(Sensor.getInstance());

class SensorController extends Controller {
	constructor(service) {
		super(service);
	}
}

module.exports = new SensorController(sensorService);
