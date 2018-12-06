const jwt = require('jsonwebtoken')
require('dotenv').config()

/*
* Generate a signed JWT token with user's email as claim
*/
module.exports.generateToken = (email) => {

	if (email.length == 0) {
		throw new Error('Invalid email address')
	}
	return jwt.sign({'email' : email}, process.env.JWT_SECRET)
}

//express middleware to verify a signed jwt token
module.exports.jwtMiddleware = (req, res, next) => {

	//check for authorization data on request header
	if (!req.headers.authorization) {
		return res.status(403).json({
			status : 'false',
			message : 'Unauthorized request'
		})
	}

	//authorization token must be in form `Bearer Token`
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

	//grab and verify jwt token
	const token = parts[1]
	var decoded = null
	try {

		decoded = jwt.verify(token, process.env.JWT_SECRET);
	}catch(err) {
	}

	//failed to verify token
	if (decoded == null || !decoded) {
		return res.status(403).json({
			status : 'false',
			message : 'Unauthorized request'
		})
	}

	//token is valid
	req.user = decoded.email
	next()
}