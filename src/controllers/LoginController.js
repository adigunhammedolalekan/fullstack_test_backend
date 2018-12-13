const Joi = require('joi');
const UserValidator = require('../User/UserValidator');
const { verifyEmail, verifyPassword } = require('../User/UserData');
const generateToken = require('../token');
const { Failure, Success } = require('./ResponseHandlers');

function LoginController(req, res) {
	const data = ({ email, password } = req.body);
	Joi.validate(data, UserValidator)
		.then(() => verifyEmail(data))
		.then(result => verifyPassword(result))
		.then(result => generateToken(result))
		.then(result => Success(res, result, 'Login successful'))
		.catch(err => Failure(res, err, 'Error in logging in user'));
}

module.exports = LoginController;
