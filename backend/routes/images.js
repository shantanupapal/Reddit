const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/:user_image", (req, res) => {
  console.log("inside get image");
  console.log(req.params);
  var image =
    path.join(__dirname, "..") + "/public/userImage/" + req.params.user_image;

  console.log(image);
  let isPresent = fs.existsSync(image);
  console.log("isPresent", isPresent);
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      path.join(__dirname, "..") + "/public/userImage/reddit-profile.png"
    );
  }
});

router.get("/com_image/:com_image", (req, res) => {
  console.log("inside get com_image");
  console.log(req.params);
  var image =
    path.join(__dirname, "..") + "/public/comImage/" + req.params.com_image;

  console.log(image);
  let isPresent = fs.existsSync(image);
  console.log("isPresent", isPresent);
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      path.join(__dirname, "..") + "/public/comImage/default_logo.png"
    );
  }
});

module.exports = router;
