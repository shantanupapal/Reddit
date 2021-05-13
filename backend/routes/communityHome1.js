"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

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
