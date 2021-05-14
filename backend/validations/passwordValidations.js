"use strict";
const Joi = require("joi");

//Validation for Profile API
function validatePassword(user) {
	const schema = Joi.object({
		userid: Joi.string().required(),
		password: Joi.string().required(),
	});

	return schema.validate(user);
}

exports.validatePassword = validatePassword;
