"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let updateCommunityVotes = async (msg, callback) => {
  console.log(" UPDATE VOTE", msg);
  let response = {};
  let err = {};
  try {
    let updated = await Community.updateOne(
      {
        _id: msg.comID,
        
      },
      { $set: { "votes": msg.vote } }
    );
    if (updated) {
      console.log("updated");
    }

    console.log("updated accept staus");
    response.status = STATUS_CODE.SUCCESS;
    response.data = "UPDATED";
    return callback(null, response);
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.INTERNAL_SERVER_ERROR;
    return callback(err, null);
  }
};

exports.updateCommunityVotes = updateCommunityVotes;
