"use strict";
const Community = require("../../models/communityModel");
const Comment = require("../../models/commentModel");
const Post = require("../../models/postModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");

let vote = async (msg, callback) => {
	console.log("---------Kafka backend--------", msg);
	let response = {};
	let err = {};
	try {
		let existingPost = null;
		if (msg.post_id !== null) {
			existingPost = await Post.findById({
				_id: msg.post_id,
			});
			if (!existingPost) {
				err.status = STATUS_CODE.BAD_REQUEST;
				err.data = MESSAGES.DATA_NOT_FOUND;
				return callback(err, null);
			}
			if (msg.upvote === true) {
				existingPost.votes = existingPost.votes + 1;
			} else {
				existingPost.votes = existingPost.votes - 1;
			}
			existingPost.save();
		}

		let existingComment = null;
		if (msg.comment_id !== null) {
			existingComment = await Comment.findById({
				_id: msg.comment_id,
			});
			if (!existingComment) {
				err.status = STATUS_CODE.BAD_REQUEST;
				err.data = MESSAGES.DATA_NOT_FOUND;
				return callback(err, null);
			}
			if (msg.upvote === true) {
				existingComment.votes = existingComment.votes + 1;
			} else {
				existingComment.votes = existingComment.votes - 1;
			}
			existingComment.save();
		}
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

exports.vote = vote;
