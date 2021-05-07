"use strict";
const Community = require("../../models/communityModel");
const mongoose = require("mongoose");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let addRule = async (msg, callback) => {
  let response = {};
  let err = {};

  const rule = {
    title: msg.title,
    desc: msg.desc,
  };

  try {
    Community.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(msg.community_id) },
      {
        $push: { rules: rule },
      },
      (err, result) => {
        if (err) {
          err.status = STATUS_CODE.BAD_REQUEST;
          err.data = MESSAGES.ACTION_NOT_COMPLETE;
          return callback(err, null);
        } else {
          console.log("community details inserted Successfully!");

          response.status = STATUS_CODE.SUCCESS;
          response.data = MESSAGES.SUCCESS;
          return callback(null, response);
        }
      }
    );
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.SERVER_ERROR;
    return callback(err, null);
  }
};

exports.addRule = addRule;
