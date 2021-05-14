"use strict";
const Community = require("../../models/communityModel");
const Comment = require("../../models/commentModel");
const Post = require("../../models/postModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let addImageToPost = async (msg, callback) => {
	console.log("---------Kafka backend--------", msg);
	let response = {};
	let err = {};
	try {
		let existingPost = await Post.findById({
			_id: msg.post_id,
		});
		if (!existingPost) {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.DATA_NOT_FOUND;
			return callback(err, null);
		}
		existingPost.image = msg.filename;
		existingPost.save();
		response.status = STATUS_CODE.SUCCESS;
		response.data = MESSAGES.UPDATE_SUCCESSFUL;
		return callback(null, response);
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.addImageToPost = addImageToPost;
