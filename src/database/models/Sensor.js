const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReadingType = require('./ReadingType');
const SensorRead = require('./SensorRead');

class Sensor {
	constructor() {
		this.schema = new Schema({
			name: {
				type: String,
				required: true,
			},
			fullname: {
				type: String,
				required: true,
			},
			ReadingType: {
				type: ReadingType.schema,
				required: true,
			},
			lastValue: {
				type: Number,
				required: true,
			},
			SensorReads: {
				type: [SensorRead.schema],
			},
		});

		mongoose.model('Sensor', this.schema);
	}

	getInstance() {
		return mongoose.model('Sensor');
	}
}

module.exports = new Sensor();
