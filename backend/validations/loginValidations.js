"use strict";
const Joi = require("joi");

function validateLogin(user) {
	const schema = {
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		route: Joi.string(),
	};

	return Joi.validate(user, schema);
}

exports.validateLogin = validateLogin;
