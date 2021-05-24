const Service = require('./Service');
const ZoneModel = require('../models/Zone');

class SensorService extends Service {
	constructor(model) {
		super(model);
		this.ZoneModel = ZoneModel.getInstance();
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
			let items = await this.model.find(query, '-SensorReads').skip(skip).limit(limit);
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

	async registerSensorRead(name, sensorRead) {
		try {
			let item = await this.model.find({ name });

			if (item && item.length && item[0]._id) {
				const [sensor] = item;
				sensor.SensorReads.push(sensorRead);
				sensor.lastValue = sensorRead.value;

				const done = await sensor.save();

				// Update dependencies
				return await this.ZoneModel.updateMany(
					{
						'sensors._id': item[0]._id,
					},
					{
						$set: { 'sensors.$.lastValue': sensorRead.value },
					},
					{
						multi: true,
					}
				);
			}

			if (item)
				return {
					error: false,
					item,
				};
		} catch (error) {
			console.log('error', error);
			return {
				error: true,
				statusCode: 500,
				message: error.errmsg || 'Not able to create item',
				errors: error.errors,
			};
		}
	}
}

module.exports = SensorService;
