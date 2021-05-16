const Service = require('./Service');
const ReadingTypeModel = require('../models/ReadingType');

class PlantService extends Service {
	constructor(model) {
		super(model);
		this.readingTypeModel = ReadingTypeModel.getInstance();
	}

	async addPlantParameter(plantId, readingTypeId, minValue, maxValue) {
		try {
			let plant = (await this.model.find({ _id: plantId }))[0];
			let readingType = (await this.readingTypeModel.find({ _id: readingTypeId }))[0];

			if (plant && readingType) {
				plant.PlantParameters.push({
					readingType,
					minValue,
					maxValue,
				});

				const done = await plant.save();

				if (done) {
					return {
						error: false,
						statusCode: 202,
						plant,
					};
				}
			}

			// Error
			return {
				error: true,
				statusCode: 404,
			};
		} catch (error) {
			return {
				error: true,
				statusCode: 500,
				message: error.errmsg || 'An error has been ocurred',
				errors: error.errors,
			};
		}
	}

	async deletePlantParameter(plantId, plantParameterId) {
		try {
			const plant = (await this.model.find({ _id: plantId }))[0];

			if (plant) {
				plant.PlantParameters = plant.PlantParameters.filter(
					(param) => param._id != plantParameterId
				);

				const done = await plant.save();

				if (done) {
					return {
						error: false,
						statusCode: 202,
						plant,
					};
				}
			}
			console.log(plant);

			// Error
			return {
				error: true,
				statusCode: 404,
			};
		} catch (error) {
			console.log(error);
			return {
				error: true,
				statusCode: 500,
				message: error.errmsg || 'An error has been ocurred',
				errors: error.errors,
			};
		}
	}
}

module.exports = PlantService;
