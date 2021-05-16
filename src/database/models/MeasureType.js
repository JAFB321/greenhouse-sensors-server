const mongoose = require('mongoose');
const { Schema } = mongoose;

class MeasureType {
	constructor() {
		this.schema = new Schema({
			type: {
				type: String,
				required: true,
			},
		});

		mongoose.model('MeasureType', this.schema);
	}

	getInstance() {
		return mongoose.model('MeasureType');
	}
}

module.exports = new MeasureType();
