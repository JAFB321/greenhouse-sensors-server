const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReadingType = require('./ReadingType');

class SensorRead {
	constructor() {
		this.schema = new Schema({
			value: {
				type: Number,
				required: true,
			},
			date: {
				type: String,
				required: true,
				default: Date.now(),
			},
		});

		mongoose.model('SensorRead', this.schema);
	}

	getInstance() {
		return mongoose.model('SensorRead');
	}
}

module.exports = new SensorRead();
