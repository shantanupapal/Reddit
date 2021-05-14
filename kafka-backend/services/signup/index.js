"use strict";
const User = require("../../models/userModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let handle_request = async (msg, callback) => {
	let response = {};
	let err = {};
	try {
		const user = await User.findOne({
			email: msg.email,
		});
		if (user) {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.EMAIL_EXISTS;
			return callback(err, null);
		} else {
			let user = new User({
				userName: msg.userName,
				email: msg.email,
			});
			const usersave = await user.save();
			//console.log("usersave: ", usersave);
			if (usersave) {
				response.status = STATUS_CODE.SUCCESS;
				response.data = usersave._id;
				return callback(null, response);
			} else {
				err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
				err.data = MESSAGES.SERVER_ERROR;
				return callback(err, null);
			}
		}
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.SERVER_ERROR;
		return callback(err, null);
	}
};

exports.handle_request = handle_request;
