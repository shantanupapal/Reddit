"use strict";
const { profileImageUpload } = require("./profileImageUpload.js");
const { comImageUpload } = require("./comImageUpload.js");


let handle_request = (msg, callback) => {
  switch (msg.body.route) {
    case "profile_Image":
      profileImageUpload(msg, callback);
      break;
    case "community_Image":
    	comImageUpload(msg, callback);
    	break;
  }
};

exports.handle_request = handle_request;
