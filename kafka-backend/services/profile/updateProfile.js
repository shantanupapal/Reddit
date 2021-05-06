"use strict";
const User = require("../../models/userModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let updateProfile = async (msg, callback) => {
	let response = {};
	let err = {};
	try {
		let user = await User.findById(msg.userid);

		if (!user) {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.ACTION_NOT_COMPLETE;
			return callback(err, null);
		} else {
			user.userName = msg.userName || user.userName;
			user.gender = msg.gender;
			user.location = msg.location;
			user.description = msg.description;
			user.topics = msg.topics;

			const updatedUser = await user.save();
			if (updatedUser) {
				response.status = STATUS_CODE.SUCCESS;
				response.data = MESSAGES.UPDATE_SUCCESSFUL;
				return callback(null, response);
			} else {
				err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
				err.data = MESSAGES.INTERNAL_SERVER_ERROR;
				return callback(err, null);
			}
		}
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.updateProfile = updateProfile;
