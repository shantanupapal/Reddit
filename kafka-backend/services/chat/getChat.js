"use strict";
const Chat = require("../../models/chatModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");

let getChat = async (message, callback) => {
  console.log("user_id", message.user_id);
  let response = {};
  let err = {};
  // const chat_id = message.chat_id;
  try {
    redisClient.get(message.chat_id, async (err, chat) => {
      if (chat) {
        response.status = STATUS_CODE.SUCCESS;
        response.data = JSON.parse(chat);
        // console.log(chat);
        return callback(null, response);
      } else {
        let gotChat = await Chat.findById(
          mongoose.Types.ObjectId(message.chat_id)
        )
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

        redisClient.setex(message.chat_id, 3600, JSON.stringify(gotChat));
        response.status = STATUS_CODE.SUCCESS;
        response.data = JSON.stringify(gotChat);
        console.log(gotChat);
        return callback(null, response);
      }
    });
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getChat = getChat;
