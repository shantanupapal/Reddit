"use strict";
const Community = require("../../models/communityModel");
const Comment = require("../../models/commentModel");
const Post = require("../../models/postModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");

let removeUserRequest = async (msg, callback) => {
	console.log("---------Kafka backend ::acceptUserRequest--------", msg);
	let response = {};
	let err = {};

	try {
		let objectIdArray = msg.data.userList.map((s) =>
			mongoose.Types.ObjectId(s)
		);
		let deletedUsers = await Community.findOneAndUpdate(
			{
				_id: msg.data.communityId,
			},
			{
				$pull: {
					communityMembers: {
						_id: { $in: objectIdArray },
					},
				},
			}
		);

		let deletedPost = await Post.deleteMany({
			communityId: msg.data.communityId,
			createdBy: { $in: objectIdArray },
		});

		let deletedComment = await Comment.deleteMany({
			communityId: msg.data.communityId,
			commentedBy: { $in: objectIdArray },
		});

		if (deletedUsers && deletedPost && deletedComment) {
			console.log("deleted");
			response.status = STATUS_CODE.SUCCESS;
			response.data = "DELETED_USERS";
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

exports.removeUserRequest = removeUserRequest;
