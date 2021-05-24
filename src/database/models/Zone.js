const mongoose = require('mongoose');
const { Schema } = mongoose;

const Sensor = require('./Sensor').getInstance();
const Plant = require('./Plant').getInstance();

class Zone {
	constructor() {
		this.schema = new Schema({
			name: {
				type: String,
				required: true,
			},
			sensors: {
				type: [Sensor.schema],
			},
			plants: {
				type: [Plant.schema],
			},
			warningsHistory: {
				type: [],
			},
		});

		mongoose.model('Zone', this.schema);
	}

	getInstance() {
		return mongoose.model('Zone');
	}
}

module.exports = new Zone();
