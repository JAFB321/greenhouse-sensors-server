const Controller = require('./Controller');
const PlantService = require('../services/PlantService');
const Plant = require('../models/Plant');

const plantService = new PlantService(Plant.getInstance());

class PlantController extends Controller {
	constructor(service) {
		super(service);
	}

	addPlantParameter = async (req, res) => {
		try {
			const { readingTypeId, minValue, maxValue } = req.body;
			const plantId = req.params.id;

			let response = await this.service.addPlantParameter(
				plantId,
				readingTypeId,
				minValue,
				maxValue
			);

			return res.status(response.statusCode).send(response);
		} catch (error) {
			console.log(error);
		}
	};

	deletePlantParameter = async (req, res) => {
		try {
			const { plantId, parameterId } = req.params;

			let response = await this.service.deletePlantParameter(plantId, parameterId);

			return res.status(response.statusCode).send(response);
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = new PlantController(plantService);
