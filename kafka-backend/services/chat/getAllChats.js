"use strict";
const Chat = require("../../models/chatModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");
const redisClient = require("../../utils/redisConfig");

const getAllChats = async (message, callback) => {
  console.log("user_id", message.user_id);
  const response = {};
  const err = {};
  try {
    const allChats = await Chat.find({
      $or: [
        { user1: mongoose.Types.ObjectId(message.user_id) },
        { user2: mongoose.Types.ObjectId(message.user_id) },
      ],
    })
      .populate({
        path: "user1",
        model: "user",
        match: {
          _id: { $ne: mongoose.Types.ObjectId(message.user_id) },
        },
        select: "userName",
      })
      .populate({
        path: "user2",
        model: "user",
        match: {
          _id: { $ne: mongoose.Types.ObjectId(message.user_id) },
        },
        select: "userName",
      })
      .populate({
        path: "message.sender",
        model: "user",
        select: "userName",
      })
      .sort({ "message.msgTime": -1 });

    if (!allChats) {
      err.status = STATUS_CODE.BAD_REQUEST;
      err.data = MESSAGES.DATA_NOT_FOUND;
      return callback(err, null);
    } else {
      response.status = STATUS_CODE.SUCCESS;
      response.data = JSON.stringify(allChats);
      return callback(null, response);
    }
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getAllChats = getAllChats;
