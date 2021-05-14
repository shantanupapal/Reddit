"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let handle_request = async (msg, callback) => {
	let response = {};
	let err = {};

	try {
		Community.find({ communityName: msg.communityName }, (err, result) => {
			if (err) {
				err.status = STATUS_CODE.BAD_REQUEST;
				err.data = MESSAGES.ACTION_NOT_COMPLETE;
				return callback(err, null);
			}
			if (result.length > 0) {
				console.log(`community name already exists`);
				response.status = STATUS_CODE.BAD_REQUEST;
				response.data = MESSAGES.DATA_ALREADY_EXISTS;
				return callback(null, response);
			} else {
				let communityMembersList = [];
				communityMembersList.push({ _id: msg.createdBy, acceptStatus: 1 });
				let newCommunity = new Community({
					communityName: msg.communityName,
					createdBy: msg.createdBy,
					description: msg.description,
					topics: msg.topic,
					communityMembers: communityMembersList,
				});
				console.log("community details inserted Successfully!");
				newCommunity.save(newCommunity, (err, result) => {
					if (err) {
						console.log("save error:", err);
						err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
						err.data = MESSAGES.INTERNAL_SERVER_ERROR;
						return callback(err, null);
					} else {
						console.log("Community Inserted Successfully!");
						response.status = STATUS_CODE.SUCCESS;
						response.data = MESSAGES.SUCCESS;
						return callback(null, response);
					}
				});
			}
		});
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.SERVER_ERROR;
		return callback(err, null);
	}
};

exports.handle_request = handle_request;
