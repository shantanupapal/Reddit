"use strict";
const { getAllCommunities } = require("./getAllCommunities");
const { acceptUserRequest } = require("./acceptUserRequest");
const { removeUserRequest } = require("./removeUserRequest");
const { searchCommunities } = require("./searchCommunities");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "get_all_communities":
      getAllCommunities(msg, callback);
      break;
    case "accept_user_request":
      acceptUserRequest(msg, callback);
      break;
    case "remove_user_request":
      removeUserRequest(msg, callback);
      break;
    case "search_communities":
      searchCommunities(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;
