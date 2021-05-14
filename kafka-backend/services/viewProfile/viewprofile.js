"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");

let handle_request = async (msg, callback) => {
	console.log("---------Kafka backend getallcommunities for user--------", msg);
	let response = {};
	let err = {};
	try {
		let communities = await Community.find(
			{
				"communityMembers._id": mongoose.Types.ObjectId(msg.userid),
				"communityMembers.acceptStatus": 1,
			},
			{
				_id: 1,
				communityName: 1,
			}
		);
		console.log("communities data is: ", communities);
		if (communities && communities.length > 0) {
			response.status = STATUS_CODE.SUCCESS;
			response.data = JSON.stringify(communities);
			return callback(null, response);
		} else {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.NO_DATA;
			return callback(err, null);
		}
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.handle_request = handle_request;
