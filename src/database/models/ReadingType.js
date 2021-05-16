const mongoose = require('mongoose');
const { Schema } = mongoose;

const MeasureType = require('./MeasureType');

class ReadingType {
	constructor() {
		this.schema = new Schema({
			type: {
				type: String,
				required: true,
			},
			symbol: {
				type: String,
			},
			fullname: {
				type: String,
			},
			MeasureType: {
				type: MeasureType.schema,
				required: true,
			},
		});

		mongoose.model('ReadingType', this.schema);
	}

	getInstance() {
		return mongoose.model('ReadingType');
	}
}

module.exports = new ReadingType();
