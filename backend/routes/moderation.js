"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.get("/getAllCommunities/:userid", async (req, res) => {
	console.log(
		"Backend getAllCommunities ::req.params.userid",
		req.params.userid
	);
	let msg = {};
	msg.route = "get_all_communities";
	msg.userid = req.params.userid;

	kafka.make_request("moderation", msg, function (err, results) {
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
