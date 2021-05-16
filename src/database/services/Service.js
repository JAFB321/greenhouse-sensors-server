const moongose = require('mongoose');

class Service {
	constructor(model) {
		this.model = model;
		this.get = this.get.bind(this);
		this.getAll = this.getAll.bind(this);
		this.insert = this.insert.bind(this);
		this.insert = this.insert.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

	async get(id) {
		try {
			let item = (await this.model.find({ _id: id }))[0];

			return {
				error: false,
				statusCode: 200,
				data: item,
			};
		} catch (error) {
			return {
				error: true,
				statusCode: 500,
				error,
			};
		}
	}

	async getAll(query = {}, skip, limit) {
		skip = skip ? Number(skip) : 0;
		limit = limit ? Number(limit) : 10;

		if (query._id) {
			try {
				query._id = new mongoose.mongo.ObjectId(query._id);
			} catch (error) {
				console.log('not able to generate mongoose id with content', query._id);
			}
		}

		try {
			let items = await this.model.find(query).skip(skip).limit(limit);
			let total = await this.model.count();

			return {
				error: false,
				statusCode: 200,
				data: items,
				total,
			};
		} catch (error) {
			return {
				error: true,
				statusCode: 500,
				error,
			};
		}
	}

	async insert(data) {
		try {
			let item = await this.model.create(data);
			if (item)
				return {
					error: false,
					item,
				};
		} catch (error) {
			console.log('error', error);
			return {
				error: true,
				statusCode: 500,
				message: error.errmsg || 'Not able to create item',
				errors: error.errors,
			};
		}
	}

	async update(id, data) {
		try {
			let item = await this.model.findByIdAndUpdate(id, data, { new: true });
			return {
				error: false,
				statusCode: 202,
				item,
			};
		} catch (error) {
			return {
				error: true,
				statusCode: 500,
				error,
			};
		}
	}

	async delete(id) {
		try {
			let item = await this.model.findByIdAndDelete(id);
			if (!item)
				return {
					error: true,
					statusCode: 404,
					message: 'item not found',
				};

			return {
				error: false,
				deleted: true,
				statusCode: 202,
				item,
			};
		} catch (error) {
			return {
				error: true,
				statusCode: 500,
				error,
			};
		}
	}
}

module.exports = Service;
