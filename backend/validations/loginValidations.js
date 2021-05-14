"use strict";
const Joi = require("joi");

function validateLogin(user) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		route: Joi.string(),
	});

	return schema.validate(user);
}

exports.validateLogin = validateLogin;
