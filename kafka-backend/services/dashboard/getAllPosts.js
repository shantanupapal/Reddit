"use strict";
// const Chat = require("../../models/chatModel");
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");

const getAllPosts = async (message, callback) => {
	console.log("user_id", message.user_id);
	const response = {};
	const err = {};
	try {
		const partOfCommunities = await Community.find(
			{
				communityMembers: {
					$elemMatch: {
						_id: mongoose.Types.ObjectId(message.user_id),
					},
				},
			},
			{ posts: 1, _id: 1, communityName: 1 }
		)
			.populate({
				path: "posts",
				populate: {
					path: "comments",
					populate: { path: "nestedComments" },
				},
			})
			.populate({
				path: "posts",
				populate: {
					path: "comments",
					populate: { path: "commentedBy" },
				},
			})
			.populate({
				path: "posts",
				populate: { path: "createdBy" },
			});
		console.log(partOfCommunities);

		if (!partOfCommunities) {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.DATA_NOT_FOUND;
			return callback(err, null);
		} else {
			const allposts = {};

			response.status = STATUS_CODE.SUCCESS;
			response.data = JSON.stringify(partOfCommunities);
			return callback(null, response);
		}
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.getAllPosts = getAllPosts;
