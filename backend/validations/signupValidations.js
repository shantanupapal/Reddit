"use strict";
const Joi = require("joi");

//Validation for User Signup API
function validateUser(user) {
	const schema = Joi.object({
		userName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});
	return schema.validate(user);
}
exports.validateUser = validateUser;
