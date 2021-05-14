"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.get("/getAllCommunities/:userid", checkAuth, async (req, res) => {
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

router.post("/acceptuserrequest", checkAuth, async (req, res) => {
	console.log("Backend acceptuserrequest ::req.body", req.body);
	let msg = {};

	msg.route = "accept_user_request";
	msg.data = req.body;

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

router.post("/removeUsers", checkAuth, async (req, res) => {
	console.log("Backend removeUsers ::req.body", req.body);
	let msg = {};

	msg.route = "remove_user_request";
	msg.data = req.body;

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
