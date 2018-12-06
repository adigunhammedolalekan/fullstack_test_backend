const Joi = require('joi');

const UserValidator = Joi.object().keys({
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string().required(),
});

module.exports = UserValidator;
