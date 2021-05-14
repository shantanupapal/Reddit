"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");
const Post = require("../../models/postModel");

let addPost = async (msg, callback) => {
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

		let new_post = new Post({
			_id: new mongoose.Types.ObjectId(),
			title: msg.title,
			body: msg.body,
			votes: 0,
			link: "",
			image: "",
			comments: [],
			createdBy: msg.user_id,
			createdAt: new Date(),
			communityId: msg.community_id,
		});

		new_post.save(new_post, async (err, result) => {
			if (err) {
				console.log("save error:", err);
				err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
				err.data = MESSAGES.INTERNAL_SERVER_ERROR;
				return callback(err, null);
			} else {
				existingCommunity.posts.push(new_post);
				const updateStatus = await existingCommunity.save();
				if (updateStatus) {
					response.status = STATUS_CODE.SUCCESS;
					response.data = { msg: MESSAGES.UPDATE_SUCCESSFUL, post_id: new_post._id };
					return callback(null, response);
				} else {
					err.status = STATUS_CODE.BAD_REQUEST;
					err.data = MESSAGES.ACTION_NOT_COMPLETE;
					return callback(err, null);
				}
			}
		});
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.addPost = addPost;
