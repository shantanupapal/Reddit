"use strict";
const { sendMessage } = require("./sendMessage");
const { getChat } = require("./getChat");
const { getAllChats } = require("./getAllChats");

let handle_request = (msg, callback) => {
    if (msg.kafka_service === "send_message") {
        sendMessage(msg, callback);
    } else if (msg.kafka_service === "get_allChats_forUser") {
        getAllChats(msg, callback);
    } else if (msg.kafka_service === "get_user_chat") {
        getChat(msg, callback);
    }
};

exports.handle_request = handle_request;
