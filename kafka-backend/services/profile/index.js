"use strict";
const { getProfile } = require("./getProfile.js");
const { updateProfile } = require("./updateProfile");

let handle_request = (msg, callback) => {
	switch (msg.route) {
		case "get_profile":
			getProfile(msg, callback);
			break;
		case "update_profile":
			updateProfile(msg, callback);
			break;
	}
};

exports.handle_request = handle_request;
