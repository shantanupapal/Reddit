"use strict";
const { getCommunity } = require("./communityHome");

let handle_request = (msg, callback) => {
	switch (msg.route) {
		case "get_community":
			getCommunity(msg, callback);
			break;
	}
};

exports.handle_request = handle_request;
