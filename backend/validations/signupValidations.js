"use strict";
const Joi = require("joi");

//Validation for User Signup API
function validateUser(user) {
	const schema = {
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	};
	return Joi.validate(user, schema);
}
exports.validateUser = validateUser;
