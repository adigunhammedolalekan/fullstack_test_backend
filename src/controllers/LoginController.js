const Joi = require('joi');
const UserValidator = require('../User/UserValidator');
const { verifyEmail, verifyPassword } = require('../User/UserData');
const generateToken = require('../token');

function LoginController(req, res) {
	const data = ({ email, password } = req.body);
	Joi.validate(data, UserValidator)
		.then(() => verifyEmail(data))
		.then(result => verifyPassword(result))
		.then(result => generateToken(result))
		.then(result => res.status(200).json({ body: result, error: false, message: 'Login successful' }))
		.catch(err => {
			if (err.isJoi) {
				res.status(422).json({ body: err, error: true, message: 'Validation error' });
			} else {
				res.status(500).json({ body: `${err}`, error: true, message: 'Error in logging in user' });
			}
		});
}

module.exports = LoginController;
