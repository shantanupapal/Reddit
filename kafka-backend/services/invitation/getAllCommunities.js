"use strict";
const Community = require("../../models/communityModel");
const { STATUS_CODE, MESSAGES } = require("../../utils/constants");

let invGetAllCommunities = async (msg, callback) => {
	console.log("---------Kafka backend--------", msg);
	let response = {};
	let err = {};
	let communityData = [];
	try {
		let communities = await Community.find({
			createdBy: msg.userid,
		}).populate({
			path: "communityMembers._id",
			select: "userName userImage",
		});
		console.log("communities data is: ", communities);
		if (communities && communities.length > 0) {
			for (let i = 0; i < communities.length; i++) {
				// if(communities.gro)
				// let communityObj = {
				// 	communityId: communities[i]._id,
				// 	communityName: communities[i].communityName,
				// 	description: communities[i].description,
				// 	createdAt: communityDetails[i].createdAt,
				// };
				// communityData.push(communityObj);
			}

			response.status = STATUS_CODE.SUCCESS;
			response.data = JSON.stringify(communities);
			return callback(null, response);
		} else {
			err.status = STATUS_CODE.BAD_REQUEST;
			err.data = MESSAGES.NO_DATA;
			return callback(err, null);
		}
	} catch (error) {
		console.log(error);
		err.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
		err.data = MESSAGES.INTERNAL_SERVER_ERROR;
		return callback(err, null);
	}
};

exports.invGetAllCommunities = invGetAllCommunities;
