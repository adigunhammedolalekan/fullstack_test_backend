const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.generateToken = (email) => {
	return jwt.sign({'email' : email}, process.env.JWT_SECRET)
}

module.exports.jwtMiddleware = (req, res, next) => {

	if (!req.headers.authorization) {
		return res.status(403).json({
			status : 'false',
			message : 'Unauthorized request'
		})
	}

	var parts = req.headers.authorization.split(' ')
	if (parts.length < 2) {
		return res.status(403).json({
			status : 'false',
			message : 'Unauthorized request'
		})
	}

	if (parts[0] != 'Bearer') {
		return res.status(403).json({
			status : 'false',
			message : 'Unauthorized request'
		})
	}

	token = parts[1]
	var errMessage = ''
	var decoded = null
	try {

		decoded = jwt.verify(token, process.env.JWT_SECRET);
	}catch(err) {
		errMessage = 'Failed to verify authorization token'
	}

	if (decoded == null || !decoded) {
		return res.status(403).json({
			status : 'false',
			message : 'Unauthorized request'
		})
	}

	req.user = decoded.email
	next()
}