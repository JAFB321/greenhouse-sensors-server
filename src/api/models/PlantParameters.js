const mongoose = require('mongoose');
const { Schema } = mongoose;

class PlantParameters {
	constructor() {
		this.schema = new Schema({
			type: {
				type: String,
				required: true,
			},
		});

		mongoose.model('PlantParameters', this.schema);
	}

	getInstance() {
		return mongoose.model('PlantParameters');
	}
}

module.exports = new PlantParameters();
