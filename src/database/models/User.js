const mongoose = require('mongoose');

const { Schema } = mongoose;

class User {
	constructor() {
		this.schema = new Schema({
			username: {
				type: String,
				required: true,
			},
			password: {
				type: String,
				required: true,
			},
			fullname: {
				type: String,
				required: true,
			},
		});

		mongoose.model('User', this.schema);
	}

	getInstance() {
		return mongoose.model('User');
	}
}

module.exports = new User();
