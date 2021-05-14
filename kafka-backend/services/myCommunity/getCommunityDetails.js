"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let getCommunityDetails = async (msg, callback) => {
  let response = {};
  let err = {};
  let communityData = [];

  console.log("kafka backend get commn detils");
  console.log("msg", msg.userid);

  try {
    let communityDetails = await Community.find({ createdBy: msg.userid });

    if (communityDetails) {
      for (let i = 0; i < communityDetails.length; i++) {
        let communityObj = {
          communityId: communityDetails[i]._id,
          communityName: communityDetails[i].communityName,
          description: communityDetails[i].description,
          totalPost: communityDetails[i].posts.length,
          joinedUsers: communityDetails[i].communityMembers,
          rules: communityDetails[i].rules,
          createdAt: communityDetails[i].createdAt,
        };
        communityData.push(communityObj);
      }
      console.log("communityData", communityData);
      response.status = STATUS_CODE.SUCCESS;
      response.data = communityData;
      return callback(null, response);
    } else {
      err.status = STATUS_CODE.BAD_REQUEST;
      err.data = MESSAGES.DATA_NOT_FOUND;
    }
  } catch (error) {
    console.log(error);
    err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
    err.data = MESSAGES.SERVER_ERROR;
    return callback(err, null);
  }
};

exports.getCommunityDetails = getCommunityDetails;
