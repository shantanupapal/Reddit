"use strict";
const { joinLeaveCommunity } = require("./joinLeaveCommunity");
const { addComment } = require("./addComment");
const { addPost } = require("./addPost");
const { vote } = require("./vote");
const { addImageToPost } = require("./addImageToPost");

let handle_request = (msg, callback) => {
	switch (msg.route) {
		case "join_leave_community":
			joinLeaveCommunity(msg, callback);
			break;
		case "add_comment_community":
			addComment(msg, callback);
			break;
		case "add_post_community":
			addPost(msg, callback);
			break;
		case "vote":
			vote(msg, callback);
			break;
		case "add_image_to_post":
			addImageToPost(msg, callback);
			break;
	}
};

exports.handle_request = handle_request;
