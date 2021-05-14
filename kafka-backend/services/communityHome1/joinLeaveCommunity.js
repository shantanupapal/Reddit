"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");

let joinLeaveCommunity = async (msg, callback) => {
	console.log("---------Kafka backend--------", msg);
	let response = {};
	let err = {};
	try {
		let existingCommunity = await Community.findById({
			_id: msg.community_id,
		});
		if (!existingCommunity) {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.DATA_NOT_FOUND;
			return callback(err, null);
		}

		let foundUser = false;
		existingCommunity.communityMembers.forEach(async (member) => {
			if (String(member._id) === msg.user_id) {
				member.acceptStatus = parseInt(msg.acceptStatus);
				await member.save();
				foundUser = true;
			}
		});
		if (!foundUser) {
			existingCommunity.communityMembers.push({
				_id: msg.user_id,
				acceptStatus: parseInt(msg.acceptStatus),
			});
		}

		const updateStatus = await existingCommunity.save();
		if (updateStatus) {
			response.status = STATUS_CODE.SUCCESS;
			response.data = MESSAGES.UPDATE_SUCCESSFUL;
			return callback(null, response);
		} else {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.ACTION_NOT_COMPLETE;
			return callback(err, null);
		}
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.joinLeaveCommunity = joinLeaveCommunity;
