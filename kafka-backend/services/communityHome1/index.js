"use strict";
const { joinLeaveCommunity } = require("./joinLeaveCommunity");
const { addComment } = require("./addComment");
const { addPost } = require("./addPost");

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
    }
};

exports.handle_request = handle_request;
