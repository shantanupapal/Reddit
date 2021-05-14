"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let comImageUpload = async (msg, callback) => {
  console.log("inside post com upload kafka backend");
  console.log("msg is", msg);

  let response = {};
  let err = {};
  try {
    let user = await Community.findById(msg.body.communityId);
console.log("user:",user);
    if (!user) {
        err.status = STATUS_CODE.BAD_REQUEST;
        err.data = MESSAGES.ACTION_NOT_COMPLETE;
        return callback(err, null);
    } else {
        user.communityImage = msg.filename || user.communityImage;
        

        const updateImage = await user.save();
        if (updateImage) {
            
            response.status = STATUS_CODE.SUCCESS;
            response.data = MESSAGES.UPDATE_SUCCESSFUL;
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

exports.comImageUpload = comImageUpload;
