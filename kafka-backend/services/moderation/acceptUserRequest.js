"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");

let acceptUserRequest = async (msg, callback) => {
	console.log("---------Kafka backend ::acceptUserRequest--------", msg);
	let response = {};
	let err = {};
	try {
		if (msg.data.userList && msg.data.userList.length > 0) {
			for (let i = 0; i < msg.data.userList.length; i++) {
				console.log("msg.data.userList[i]", msg.data.userList[i]);
				let updated = await Community.updateOne(
					{
						_id: msg.data.communityId,
						"communityMembers._id": mongoose.Types.ObjectId(
							msg.data.userList[i]
						),
					},
					{ $set: { "communityMembers.$.acceptStatus": 1 } }
				);
				if (updated) {
					console.log("updated");
				}
			}
		}

		console.log("updated accept staus");
		response.status = STATUS_CODE.SUCCESS;
		response.data = "UPDATED";
		return callback(null, response);
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.acceptUserRequest = acceptUserRequest;
