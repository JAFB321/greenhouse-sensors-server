const mongoose = require('mongoose');
const Service = require('./Service');
const ReadingTypeModel = require('../models/ReadingType');
const ZoneModel = require('../models/Zone');

class PlantService extends Service {
	constructor(model, dependencies) {
		super(model);
		this.readingTypeModel = ReadingTypeModel.getInstance();
		this.ZoneModel = ZoneModel.getInstance();
	}

	async updateDependencies(id, data) {
		let plant = (await this.model.find({ _id: id }, '-PlantParameters'))[0];

		data = {
			...plant._doc,
			...data,
		};

		return await this.ZoneModel.updateMany(
			{
				'plants._id': id,
			},
			{
				$set: { 'plants.$': data },
			},
			{
				multi: true,
			}
		);
	}

	async getPlantParameter(plantId) {
		try {
			console.log(plant);
			if (plant.data) {
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
