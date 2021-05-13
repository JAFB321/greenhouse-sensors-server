const mongoose = require('mongoose');

class Connection {
	constructor({ URL, dbName, user, pass }) {
		this.URL = URL;
		this.dbName = dbName;
		this.user = user;
		this.pass = pass;
	}

	async Connect() {
		return await mongoose.connect(this.URL, {
			dbName: this.dbName,
			user: this.user,
			pass: this.pass,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
}

module.exports = Connection;
