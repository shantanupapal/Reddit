"use strict";
const User = require("../../models/userModel");
const Chat = require("../../models/chatModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");

let sendMessage = async (message, callback) => {
	console.log("inside kafka sendmessage");
	const response = {};
	const err = {};
	try {
		const new_message = {
			sender: mongoose.Types.ObjectId(message.sender),
			msgContent: message.msgContent,
			msgTime: new Date(),
		};

		//if the chat between same 2 users is already available
		if (message.chat_id) {
			const chatAvailable = await Chat.findById(mongoose.Types.ObjectId(message.chat_id));
			if (!chatAvailable) {
				err.status = STATUS_CODE.BAD_REQUEST;
				err.data = MESSAGES.DATA_NOT_FOUND;
				return callback(err, null);
			}

			chatAvailable.message.push(new_message);
			const updateAvailableChat = await chatAvailable.save({ new: true });
			let gotChat = await Chat.findById(mongoose.Types.ObjectId(message.chat_id))
				.populate({
					path: "user1",
					model: "user",
					match: {
						_id: {
							$ne: mongoose.Types.ObjectId(message.user_id),
						},
					},
					select: "userName",
				})
				.populate({
					path: "user2",
					model: "user",
					match: {
						_id: {
							$ne: mongoose.Types.ObjectId(message.user_id),
						},
					},
					select: "userName",
				})
				.populate({
					path: "message.sender",
					model: "user",
					select: "userName",
				});

			if (updateAvailableChat && gotChat) {
				redisClient.setex(message.chat_id, 3600, JSON.stringify(gotChat));
				response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
				response.data = updateAvailableChat;
				return callback(null, response);
			} else {
				err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
				err.data = MESSAGES.ACTION_NOT_COMPLETE;
				return callback(err, null);
			}
		}
		//if the chat between same 2 users is NOT available
		else {
			console.log("New chat");
			const newChat = new Chat({
				user1: message.sender,
				user2: message.receiver,
				message: new_message,
			});

			const saveNewChat = await newChat.save({ new: true });
			const chat_id = String(saveNewChat._id);
			if (saveNewChat) {
				redisClient.setex(chat_id, 3600, JSON.stringify(saveNewChat));
				response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
				response.data = saveNewChat;
				return callback(null, response);
			} else {
				err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
				err.data = MESSAGES.INTERNAL_SERVER_ERROR;
				return callback(err, null);
			}
		}
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.sendMessage = sendMessage;
