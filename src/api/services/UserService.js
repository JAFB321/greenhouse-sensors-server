const Service = require('./Service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const encryptPassword = async (password) => {
	const hash = await bcrypt.hash(password, 10);
	return hash;
};

const matchPassword = async function (userpassword, password) {
	return await bcrypt.compare(password, userpassword);
};

class UserService extends Service {
	constructor(model) {
		super(model);
	}

	async auth({ username, password } = {}, secretKey) {
		try {
			const user = (await this.model.find({ username }))[0];
			console.log(user);

			if (user) {
				if (await matchPassword(user.password, password)) {
					const { _id, username, fullname } = user;
					const token = jwt.sign(
						{
							_id,
							username,
							fullname,
						},
						secretKey,
						{
							expiresIn: '1h',
						}
					);

					return {
						error: false,
						statusCode: 202,
						data: {
							user: {
								_id,
								username,
								fullname,
							},
							token,
						},
					};
				} else {
					return {
						error: true,
						statusCode: 401,
						data: {},
					};
				}
			}
		} catch (error) {
			console.log(error);
			return {
				error: true,
				statusCode: 500,
				error,
			};
		}
	}

	async register(data) {
		const { password } = data;

		data.password = await encryptPassword(password);

		try {
			let item = await this.model.create(data);
			if (item)
				return {
					error: false,
					statusCode: 202,
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
}

module.exports = UserService;
