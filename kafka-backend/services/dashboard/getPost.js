"use strict";
// const Chat = require("../../models/chatModel");
const Post = require("../../models/postModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");
// const redisClient = require("../../utils/redisConfig");

const getPost = async (message, callback) => {
    console.log("user_id", message.post_id);
    const response = {};
    const err = {};
    try {
        const post = await Post.findById({
            _id: mongoose.Types.ObjectId(message.post_id),
        })
            .populate({
                path: "comments",
                populate: {
                    path: "nestedComments",
                },
            })
            .populate({
                path: "createdBy",
            });

        console.log(post);

        if (!post) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.DATA_NOT_FOUND;
            return callback(err, null);
        } else {
            const allposts = {};

            response.status = STATUS_CODE.SUCCESS;
            response.data = JSON.stringify(post);
            return callback(null, response);
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.getPost = getPost;
