"use strict";
const Community = require("../../models/communityModel");
const Comment = require("../../models/commentModel");
const Post = require("../../models/postModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");

let addComment = async (msg, callback) => {
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

        let new_comment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            content: msg.content,
            votes: 0,
            commentedBy: msg.user_id,
            nestedComments: [],
        });

        if (msg.comment_id) {
            let existingComment = await Comment.findById({
                _id: msg.comment_id,
            });
            if (!existingComment) {
                err.status = STATUS_CODE.BAD_REQUEST;
                err.data = MESSAGES.DATA_NOT_FOUND;
                return callback(err, null);
            }

            existingComment.nestedComments.push(new_comment);
            new_comment.save(new_comment, async (err, result) => {
                if (err) {
                    console.log("save error:", err);
                    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
                    return callback(err, null);
                } else {
                    const updateStatus = await existingComment.save();
                    if (updateStatus) {
                        response.status = STATUS_CODE.SUCCESS;
                        response.data = MESSAGES.UPDATE_SUCCESSFUL;
                        return callback(null, response);
                    } else {
                        err.status = STATUS_CODE.BAD_REQUEST;
                        err.data = MESSAGES.ACTION_NOT_COMPLETE;
                        return callback(err, null);
                    }
                }
            });
        } else {
            existingPost.comments.push(new_comment);
            new_comment.save(new_comment, async (err, result) => {
                if (err) {
                    console.log("save error:", err);
                    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
                    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
                } else {
                    const updateStatus = await existingPost.save();
                    if (updateStatus) {
                        response.status = STATUS_CODE.SUCCESS;
                        response.data = MESSAGES.UPDATE_SUCCESSFUL;
                        return callback(null, response);
                    } else {
                        err.status = STATUS_CODE.BAD_REQUEST;
                        err.data = MESSAGES.ACTION_NOT_COMPLETE;
                        return callback(err, null);
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
        err.data = MESSAGES.INTERNAL_SERVER_ERROR;
        return callback(err, null);
    }
};

exports.addComment = addComment;
