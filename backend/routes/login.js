"use strict";
const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const pool = require("../utils/mysqlConnection");
const kafka = require("../kafka/client");
const { secret } = require("../utils/config");
const { STATUS_CODE, MESSAGES } = require("../utils/constants");
const { validateLogin } = require("../validations/loginValidations");
const { auth } = require("../utils/passport");
const logger = require("../utils/logger");
auth();

router.post("/", async (req, res) => {
	let msg = req.body;
	msg.route = "login";
	const { error } = validateLogin(req.body);
	if (error) {
		msg.error = error.details[0].message;
		logger.error(msg);
		return res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
	}
	let sql = `CALL Password_get('${req.body.email_id}');`;
	pool.query(sql, (err, sqlResult) => {
		if (err) {
			msg.status = STATUS_CODE.INTERNAL_SERVER_ERROR;
			logger.error(err);
			return res
				.status(STATUS_CODE.INTERNAL_SERVER_ERROR)
				.send(MESSAGES.INTERNAL_SERVER_ERROR);
		}
		if (sqlResult && sqlResult.length > 0 && sqlResult[0][0]) {
			if (passwordHash.verify(req.body.password, sqlResult[0][0].password)) {
				let msg = {
					route: "login",
					user_id: sqlResult[0][0].user_id,
				};

				kafka.make_request("account", msg, function (err, results) {
					if (err) {
						msg.error = err.data;
						logger.error(msg);
						return res
							.status(STATUS_CODE.INTERNAL_SERVER_ERROR)
							.send(MESSAGES.INTERNAL_SERVER_ERROR);
					} else {
						const payload = {
							email_id: req.body.email_id,
							user_id: sqlResult[0][0].user_id,
							first_name: results.data.first_name,
							last_name: results.data.last_name,
							user_name: results.data.user_name,
							user_image: results.data.user_image,
						};
						const token = jwt.sign(payload, secret, {
							expiresIn: 900000, // in seconds
						});
						let jwtToken = "JWT " + token;
						msg.status = STATUS_CODE.SUCCESS;
						msg.token = jwtToken;
						logger.info(msg);
						return res.status(STATUS_CODE.SUCCESS).send(jwtToken);
					}
				});
			} else {
				msg.status = STATUS_CODE.UNAUTHORIZED;
				logger.info(msg);
				return res
					.status(STATUS_CODE.UNAUTHORIZED)
					.send(MESSAGES.INVALID_CREDENTIALS);
			}
		}
	});
});

module.exports = router;
