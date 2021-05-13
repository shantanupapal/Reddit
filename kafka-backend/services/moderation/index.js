"use strict";
const { getAllCommunities } = require("./getAllCommunities");
const { acceptUserRequest } = require("./acceptUserRequest");

let handle_request = (msg, callback) => {
	switch (msg.route) {
		case "get_all_communities":
			getAllCommunities(msg, callback);
			break;
		case "accept_user_request":
			acceptUserRequest(msg, callback);
			break;
	}
};

exports.handle_request = handle_request;
