"use strict";
const User = require("../../models/userModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let handle_request = async (msg, callback) => {
	let response = {};
	let err = {};

	try {
		let user = await User.findById(msg.userid);

		if (user) {
			let userData = {
				userName: user.userName,
				email: user.email,
				userid: user._id,
			};
			response.status = STATUS_CODE.SUCCESS;
			response.data = userData;
			return callback(null, response);
		} else {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.ACTION_NOT_COMPLETE;
			return callback(err, null);
		}
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.SERVER_ERROR;
		return callback(err, null);
	}
};

exports.handle_request = handle_request;
