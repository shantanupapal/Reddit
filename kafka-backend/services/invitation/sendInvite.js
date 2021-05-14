"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");
const mongoose = require("mongoose");

let invSendInvite = async (msg, callback) => {
    console.log("---------Kafka backend--------", msg);
    let response = {};
    let err = {};
    try {
        let add_member = {
            _id: mongoose.Types.ObjectId(msg.user_id),
            acceptStatus: 0,
        };

        let existingCommunity = await Community.findById(msg.community_id);
        if (!existingCommunity) {
            err.status = STATUS_CODE.BAD_REQUEST;
            err.data = MESSAGES.DATA_NOT_FOUND;
            return callback(err, null);
        }
        existingCommunity.communityMembers.push(add_member);
        let communityUpdate = await existingCommunity.save({ new: true });

        if (communityUpdate) {
            response.status = STATUS_CODE.CREATED_SUCCESSFULLY;
            response.data = communityUpdate;
            return callback(null, response);
        } else {
            err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
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

exports.invSendInvite = invSendInvite;
