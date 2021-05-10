"use strict";
const { getAllCommunities } = require("./getAllCommunities");
//const { updateProfile } = require("./updateProfile");

let handle_request = (msg, callback) => {
	switch (msg.route) {
		case "get_all_communities":
			getAllCommunities(msg, callback);
			break;
		// case "update_profile":
		// 	updateProfile(msg, callback);
		// 	break;
	}
};

exports.handle_request = handle_request;
