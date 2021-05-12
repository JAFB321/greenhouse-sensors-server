const mongoose = require('mongoose');
const { Schema } = mongoose;

class Zone {
	constructor() {
		this.schema = new Schema({
			name: {
				type: String,
				required: true,
			},
		});

		mongoose.model('Zone', this.schema);
	}

	getInstance() {
		return mongoose.model('Zone');
	}
}

module.exports = new Zone();
