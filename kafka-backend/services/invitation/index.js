"use strict";
const { invGetAllCommunities } = require("./getAllCommunities");
const { invSendInvite } = require("./sendInvite");

let handle_request = (msg, callback) => {
    if (msg.kafka_service === "inv_getallcommunities") {
        invGetAllCommunities(msg, callback);
    } else if (msg.kafka_service === "inv_sendinvite") {
        invSendInvite(msg, callback);
    } else if (msg.kafka_service === "") {
        // getChat(msg, callback);
    } else if (msg.kafka_service === "") {
        // getAllUsers(msg, callback);
    }
};

exports.handle_request = handle_request;
