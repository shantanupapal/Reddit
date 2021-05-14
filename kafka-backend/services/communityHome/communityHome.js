"use strict";

const Post = require("../../models/postModel");
const Comment = require("../../models/commentModel");
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getCommunity = async (msg, callback) => {
	console.log("---------Kafka backend--------", msg);
	let response = {};
	let err = {};
	try {
		// let communities = await Community.find().populate({
		// 	path: "communityMembers._id",
		// });
		// console.log("communities data is: ", communities);
		let community = await Community.find({ communityName: msg.communityName })
			.populate({ path: "communityMembers._id" })
			.populate({ path: "createdBy" })
			.populate({ path: "posts", populate: { path: "comments", populate: { path: "nestedComments" } } })
			.populate({ path: "posts", populate: { path: "createdBy" } });

		console.log("community data is: ", community);
		if (community && community.length > 0) {
			response.status = STATUS_CODE.SUCCESS;
			response.data = JSON.stringify(community);
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

exports.getCommunity = getCommunity;
