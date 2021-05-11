"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");
const path = require("path");

const uploadFileToS3 = require("../utils/awsS3");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..") + "/public/userImage",
  filename: (req, file, cb) => {
    cb(
      null,
      "user" +
        req.params.userId +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

router.post("/:userId", upload, async (req, res) => {
  let msg = req.params;
  msg.route = "profile_Image";

  let imageUrl = "";
  if (req.file) {
    try {
      imageUrl = await uploadFileToS3(req.file, "image", msg.userId);
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
