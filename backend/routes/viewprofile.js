"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.get("/getCommunities/:userid", checkAuth, async (req, res) => {
	console.log("req.params.userid", req.params.userid);

	let user = { userid: req.params.userid };

	kafka.make_request("viewprofile", user, function (err, results) {
		if (err) {
			logger.error(err.data);
			return res.status(err.status).send(err.data);
		} else if (results) {
			logger.info(results.status);
			return res.status(results.status).send(results.data);
		}
	});
});

module.exports = router;
