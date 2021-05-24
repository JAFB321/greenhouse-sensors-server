const jwt = require('jsonwebtoken');

const tokenCheck = (req, res, next) => {
	try {
		const token = req.header('token');
		const secret = req.app.get('JWT_SECRET_KEY');
		if (token) {
			if (jwt.verify(token, secret)) {
				next();
				return;
			}
		}

		res.status(401).json({ error: true, statusCode: 401 });
	} catch (error) {
		return res.status(401).json({ error: true, statusCode: 401 });
	}
};

module.exports = tokenCheck;
