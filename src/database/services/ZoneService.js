const Service = require('./Service');
const SensorModel = require('../models/Sensor').getInstance();
const PlantModel = require('../models/Plant').getInstance();
const { checkHealth } = require('../helpers/ZoneHelpers');

class ZoneService extends Service {
	constructor(model) {
		super(model);
		this.SensorModel = SensorModel;
		this.PlantModel = PlantModel;
	}

	async registerWarning(zoneId, warning) {
		try {
			const zone = (await this.model.find({ _id: zoneId }))[0];
			console.log(warning);
			if (zone && warning) {
				const { sensorId, plantId } = warning;
				zone.warningsHistory.push({
					sensorId,
					plantId,
					date: Date.now(),
				});
				console.log(zone);
				const done = await sensor.save();

				if (done) {
					return {
						error: false,
						statusCode: 200,
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
			};
		}
	}

	async getWarnings(zoneId) {
		try {
			const zone = (await this.model.find({ _id: zoneId }))[0];
			if (zone) {
				return {
					error: false,
					statusCode: 200,
					warnings: zone?.warningsHistory,
				};
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
			};
		}
	}

	async getAllPopulated() {
		try {
			const zones = await this.model.find();

			if (zones?.length) {
				const populatedZones = zones.map(async (zone) => {
					const plants = zone.plants.map(async (plant) => {
						const { PlantParameters } = (
							await this.PlantModel.find({ _id: plant._id }, 'PlantParameters -_id')
						)[0];
						plant.PlantParameters = PlantParameters;

						return plant;
					});

					zone.plants = await Promise.all(plants);
					return zone;
				});

				return {
					error: false,
					statusCode: 200,
					zones: await Promise.all(populatedZones),
				};
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

	async getZoneHealth(zoneId) {
		try {
			let zone = (await this.model.find({ _id: zoneId }))[0];

			if (zone) {
				const zoneStatus = [];
				for (let { _id } of zone.plants) {
					const plant = (await this.PlantModel.find({ _id }))[0];
					const sensors = zone.sensors;

					const status = checkHealth(plant, sensors);

					zoneStatus.push({
						plant: {
							_id: plant._id,
						},
						status,
					});
				}

				return {
					error: false,
					statusCode: 202,
					zoneStatus,
				};
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

	async getAll(query = {}, skip, limit) {
		skip = skip ? Number(skip) : 0;
		limit = limit ? Number(limit) : 10;

		if (query._id) {
			try {
				query._id = new mongoose.mongo.ObjectId(query._id);
			} catch (error) {
				console.log('not able to generate mongoose id with content', query._id);
			}
		}

		try {
			let items = await this.model.find(query, '-warningsHistory').skip(skip).limit(limit);
			let total = await this.model.count();

			return {
				error: false,
				statusCode: 200,
				data: items,
				total,
			};
		} catch (error) {
			return {
				error: true,
				statusCode: 500,
			};
		}
	}
}

module.exports = ZoneService;
