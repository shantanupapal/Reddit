"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.post("/", checkAuth, async (req, res) => {
	console.log("inside create community");
	let msg = req.body;
	msg.route = "createCommunity";

	kafka.make_request("createCommunity", msg, function (err, results) {
		if (err) {
			msg.error = err.data;
			logger.error(msg);
			return res.status(err.status).send(err.data);
		} else {
			msg.status = results.status;
			logger.info(msg);
			return res.status(results.status).send(results.data);
		}
	});
});

module.exports = router;
