"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.get("/getCommunity/:communityId", async (req, res) => {
	console.log("Backend getCommunity ::req.params.communityId", req.params.communityId);
	let msg = {};
	msg.route = "get_community";
	msg.id = req.params.communityId;

	kafka.make_request("communityHome", msg, function (err, results) {
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
