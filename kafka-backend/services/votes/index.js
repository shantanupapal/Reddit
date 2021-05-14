"use strict";
const { updateCommunityVotes } = require("./updateCommunityVotes");


let handle_request = (msg, callback) => {
	switch (msg.route) {
		case "vote_community":
			updateCommunityVotes(msg, callback);
			break;

	}
};

exports.handle_request = handle_request;
