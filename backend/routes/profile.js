"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");
const pool = require("../utils/mysqlConnection");
const { validatePassword } = require("../validations/passwordValidations");
const passwordHash = require("password-hash");
const { STATUS_CODE, MESSAGES } = require("../utils/constants");
router.get("/getuserprofile/:userid", checkAuth, async (req, res) => {
	console.log("req.params.userid", req.params.userid);
	let msg = {};
	msg.route = "get_profile";
	msg.userid = req.params.userid;

	kafka.make_request("profile", msg, function (err, results) {
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

router.post("/changepassword", checkAuth, async (req, res) => {
	const { error } = validatePassword(req.body);
	if (error) {
		return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
	}
	let hashedPassword = passwordHash.generate(req.body.password);
	let sql = `CALL update_Password('${req.body.userid}', '${hashedPassword}');`;
	pool.query(sql, (err, sqlResult) => {
		if (err) {
			return res
				.status(STATUS_CODE.INTERNAL_SERVER_ERROR)
				.send(MESSAGES.INTERNAL_SERVER_ERROR);
		}
		if (
			sqlResult &&
			sqlResult.length > 0 &&
			sqlResult[0][0].status === "PASSWORD_UPDATED"
		) {
			return res.status(STATUS_CODE.SUCCESS).send(MESSAGES.SUCCESS);
		} else {
			return res
				.status(STATUS_CODE.UNAUTHORIZED)
				.send(MESSAGES.INVALID_CREDENTIALS);
		}
	});
});

router.post("/updateuser", checkAuth, async (req, res) => {
	// const { error } = validateProfile(req.body);
	// if (error) {
	//     return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
	// }

	let msg = {};
	msg = req.body;
	msg.route = "update_profile";

	kafka.make_request("profile", msg, function (err, results) {
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
