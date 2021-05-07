"use strict";
const { addRule } = require("./addRule");
const { updateDesc } = require("./updateDesc");
const { deleteCommunity } = require("./deleteCommunity");
const { getCommunityDetails } = require("./getCommunityDetails");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "addRule":
      addRule(msg, callback);
      break;
    case "updateDesc":
      updateDesc(msg, callback);
      break;
    case "deleteCommunity":
      deleteCommunity(msg, callback);
      break;
    case "getCommunityDetails":
      getCommunityDetails(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
getCommunityDetails