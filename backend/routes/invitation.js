"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.get("/getallcommunities/:userid", async (req, res) => {
    console.log(
        "Backend getAllCommunities ::req.params.userid",
        req.params.userid
    );
    let msg = {};
    msg.kafka_service = "inv_getallcommunities";
    msg.userid = req.params.userid;

    kafka.make_request("invitation", msg, function (err, results) {
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

router.post("/sendinvite", async (req, res) => {
    let msg = req.body;
    msg.kafka_service = "inv_sendinvite";

    kafka.make_request("invitation", msg, function (err, results) {
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
