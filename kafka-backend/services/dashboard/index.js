"use strict";
// const { sendMessage } = require("./sendMessage");
// const { getChat } = require("./getChat");
const { getAllPosts } = require("./getAllPosts");
const { getAllCommunities } = require("./getAllCommunities");
const { getPost } = require("./getPost");
const { vote } = require("./vote");

let handle_request = (msg, callback) => {
    if (msg.kafka_service === "get_all_posts") {
        getAllPosts(msg, callback);
    } else if (msg.kafka_service === "get_all_communities") {
        getAllCommunities(msg, callback);
    } else if (msg.kafka_service === "get_post") {
        getPost(msg, callback);
    } else if (msg.kafka_service === "dashboard_vote") {
        vote(msg, callback);
    }
};

exports.handle_request = handle_request;
