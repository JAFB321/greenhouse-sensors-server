const Controller = require('./Controller');
const PlantService = require('../services/PlantService');
const Plant = require('../models/Plant');

const plantService = new PlantService(Plant.getInstance());

class PlantController extends Controller {
	constructor(service) {
		super(service);
	}
}

module.exports = new PlantController(plantService);
