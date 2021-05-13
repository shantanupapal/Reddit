"use strict";
const { profileImageUpload } = require("./profileImageUpload.js");

let handle_request = (msg, callback) => {
  switch (msg.body.route) {
    case "profile_Image":
      profileImageUpload(msg, callback);
      break;
    // case "update_profile":
    // 	updateProfile(msg, callback);
    // 	break;
  }
};

exports.handle_request = handle_request;
