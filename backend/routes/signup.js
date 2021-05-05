"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const passwordHash = require("password-hash");
const pool = require("../utils/mysqlConnection");
const { validateUser } = require("../validations/signupValidations");
const { STATUS_CODE, MESSAGES } = require("../utils/constants");
const logger = require("../utils/logger");

router.post("/", async (req, res) => {
	console.log("req.body: ", req.body);
	let msg = req.body;
	const { error } = validateUser(req.body);
	if (error) {
		msg.error = error.details[0].message;
		logger.error(msg);
		return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
	}
	kafka.make_request("signup", req.body, function (err, results) {
		console.log("Backend results: ", results);
		if (err) {
			msg.error = err.data;
			logger.error(msg);
			return res.status(err.status).send(err.data);
		} else {
			if (results.status === 200) {
				let userid = results.data;
				let hashedPassword = passwordHash.generate(req.body.password);
				let sql = `CALL put_User('${userid}','${req.body.email}', '${hashedPassword}');`;
				pool.query(sql, (err, sqlResult) => {
					if (err) {
						msg.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
						logger.error(msg);
						return res
							.status(STATUS_CODE.INTERNAL_SERVER_ERROR)
							.send(MESSAGES.SERVER_ERROR);
					}
					if (
						sqlResult &&
						sqlResult.length > 0 &&
						sqlResult[0][0].status === "USER_ADDED"
					) {
						msg.status = STATUS_CODE.SUCCESS;
						logger.info(msg);
						let userData = {
							userName: req.body.userName,
							email: req.body.email,
							userid: results.data,
						};
						return res.status(STATUS_CODE.SUCCESS).send(userData);
					}
				});
			}
		}
	});
});

module.exports = router;
