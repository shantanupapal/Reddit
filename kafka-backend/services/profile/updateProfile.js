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
			user.gender = msg.gender || user.gender;
			user.location = msg.location || user.location;
			user.description = msg.description || user.description;
			user.topics = msg.topics || user.topics;

			const updatedUser = await user.save();
			if (updatedUser) {
				let profile = {
					userid: user._id,
					userName: user.userName,
					email: user.email,
					gender: user.gender,
					location: user.location,
					description: user.description,
					userImage: user.userImage,
					topics: user.topics,
					createdAt: user.createdAt,
				};
				response.status = STATUS_CODE.SUCCESS;
				response.data = JSON.stringify(profile);
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
