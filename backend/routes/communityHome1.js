"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");
const uploadFileToS3 = require("../utils/awsS3");

router.post("/join_leave", async (req, res) => {
	let msg = req.body;
	msg.route = "join_leave_community";

	kafka.make_request("communityHome1", msg, function (err, results) {
		if (err) {
			msg.error = err.data;
			logger.error(msg);
			return res.status(err.status).send(err.data);
		} else if (results) {
			msg.status = results.status;
			logger.info(msg);
			return res.status(results.status).send(results.data);
		}
	});
});

router.post("/add_comment", async (req, res) => {
	let msg = req.body;
	msg.route = "add_comment_community";

	kafka.make_request("communityHome1", msg, function (err, results) {
		if (err) {
			msg.error = err.data;
			logger.error(msg);
			return res.status(err.status).send(err.data);
		} else if (results) {
			msg.status = results.status;
			logger.info(msg);
			return res.status(results.status).send(results.data);
		}
	});
});

router.post("/vote", async (req, res) => {
	let msg = req.body;
	msg.route = "vote";

	kafka.make_request("communityHome1", msg, function (err, results) {
		if (err) {
			msg.error = err.data;
			logger.error(msg);
			return res.status(err.status).send(err.data);
		} else if (results) {
			msg.status = results.status;
			logger.info(msg);
			return res.status(results.status).send(results.data);
		}
	});
});
const multer = require("multer");
let path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads/");
	},

	// By default, multer removes file extensions so let's add them back
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage }).single("file");

router.post("/add_image_to_post", upload, async (req, res) => {
	console.log(req.body, req.file);
	let msg = req.body;
	msg.filename = req.file.filename;
	msg.route = "add_image_to_post";
	kafka.make_request("communityHome1", msg, function (err, results) {
		if (err) {
			msg.error = err.data;
			logger.error(msg);
			return res.status(err.status).send(err.data);
		} else if (results) {
			msg.status = results.status;
			logger.info(msg);
			return res.status(results.status).send(results.data);
		}
	});
});

router.post("/add_post", async (req, res) => {
	let msg = req.body;
	msg.route = "add_post_community";
	kafka.make_request("communityHome1", msg, function (err, results) {
		if (err) {
			msg.error = err.data;
			logger.error(msg);
			return res.status(err.status).send(err.data);
		} else if (results) {
			msg.status = results.status;
			logger.info(msg);
			return res.status(results.status).send(results.data);
		}
	});
});

module.exports = router;
