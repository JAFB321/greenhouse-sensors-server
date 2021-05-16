const Service = require('./Service');
const SensorModel = require('../models/Sensor').getInstance();
const PlantModel = require('../models/Plant').getInstance();

class ZoneService extends Service {
	constructor(model) {
		super(model);
		this.SensorModel = SensorModel;
		this.PlantModel = PlantModel;
	}

	async addSensor(zoneId, sensorId) {
		try {
			let zone = (await this.model.find({ _id: zoneId }))[0];
			let sensor = (await this.SensorModel.find({ _id: sensorId }, '-SensorReads'))[0];

			if (zone && sensor) {
				zone.sensors.push(sensor);

				const done = await zone.save();

				if (done) {
					return {
						error: false,
						statusCode: 202,
						zone,
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

	async deleteSensor(zoneId, sensorId) {
		try {
			const zone = (await this.model.find({ _id: zoneId }))[0];

			if (zone) {
				zone.sensors = zone.sensors.filter((sensor) => sensor._id != sensorId);

				const done = await zone.save();

				if (done) {
					return {
						error: false,
						statusCode: 202,
						zone,
					};
				}
			}

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

	async addPlant(zoneId, plantId) {
		try {
			let zone = (await this.model.find({ _id: zoneId }))[0];
			let plant = (await this.PlantModel.find({ _id: plantId }, '-PlantParameters'))[0];
			console.log(plant);

			if (zone && plant) {
				zone.plants.push(plant);

				const done = await zone.save();

				if (done) {
					return {
						error: false,
						statusCode: 202,
						zone,
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

	async deletePlant(zoneId, plantId) {
		try {
			const zone = (await this.model.find({ _id: zoneId }))[0];

			if (zone) {
				zone.plants = zone.plants.filter((plant) => plant._id != plantId);

				const done = await zone.save();

				if (done) {
					return {
						error: false,
						statusCode: 202,
						zone,
					};
				}
			}

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

module.exports = ZoneService;
