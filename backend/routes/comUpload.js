"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");
const path = require("path");
const uploadFileToS3 = require("../utils/awsS3");
const multer = require("multer");

const comStorage = multer.diskStorage({
  destination: path.join(__dirname, "..") + "/public/comImage",
  filename: (req, file, cb) => {
    cb(
      null,
      "user" +
        req.params.communityId +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const comUpload = multer({ storage: comStorage }).single("com_image");

router.post("/:communityId", comUpload, async (req, res) => {
  console.log("inside commn upload");
  let msg = req.params;
  msg.route = "community_Image";
  console.log("req param", req.params);
  let imageUrl = "";
  if (req.file) {
    try {
      imageUrl = await uploadFileToS3(req.file, "com_image", msg.communityId);
      msg.userImage = imageUrl.Location;
    } catch (error) {
      console.log(error);
    }
  }

  kafka.make_request(
    "images",
    { body: msg, filename: req.file.filename },
    function (err, results) {
      if (err) {
        msg.error = err.data;
        logger.error(msg);
        return res.status(err.status).send(err.data);
      } else {
        msg.status = results.status;
        logger.info(msg);
        return res.status(results.status).send(results.data);
      }
    }
  );
});
module.exports = router;
