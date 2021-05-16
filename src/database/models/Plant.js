const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlantParameters = require('./PlantParameters');

class Plant {
	constructor() {
		this.schema = new Schema({
			type: {
				type: String,
				required: true,
			},
			PlantParameters: {
				type: [PlantParameters.schema],
			},
			imageURL: {
				type: String,
			},
		});

		mongoose.model('Plant', this.schema);
	}

	getInstance() {
		return mongoose.model('Plant');
	}
}

module.exports = new Plant();
