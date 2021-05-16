const Controller = require('./Controller');
const ZoneService = require('../services/ZoneService');
const Zone = require('../models/Zone');

const zoneService = new ZoneService(Zone.getInstance());

class ZoneController extends Controller {
	constructor(service) {
		super(service);
	}

	addSensor = async (req, res) => {
		const { sensorId } = req.body;
		const { zoneId } = req.params;

		const response = await this.service.addSensor(zoneId, sensorId);
		return res.status(response.statusCode).send(response);
	};

	deleteSensor = async (req, res) => {
		const { sensorId, zoneId } = req.params;

		const response = await this.service.deleteSensor(zoneId, sensorId);
		return res.status(response.statusCode).send(response);
	};

	addPlant = async (req, res) => {
		const { plantId } = req.body;
		const { zoneId } = req.params;

		const response = await this.service.addPlant(zoneId, plantId);
		return res.status(response.statusCode).send(response);
	};

	deletePlant = async (req, res) => {
		const { plantId, zoneId } = req.params;

		const response = await this.service.deletePlant(zoneId, plantId);
		return res.status(response.statusCode).send(response);
	};
}

module.exports = new ZoneController(zoneService);
