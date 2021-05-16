const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReadingType = require('./ReadingType');

class PlantParameters {
	constructor() {
		this.schema = new Schema({
			readingType: {
				type: ReadingType.schema,
				required: true,
			},
			minValue: {
				type: Number,
			},
			maxValue: {
				type: Number,
			},
		});

		mongoose.model('PlantParameters', this.schema);
	}

	getInstance() {
		return mongoose.model('PlantParameters');
	}
}

module.exports = new PlantParameters();
