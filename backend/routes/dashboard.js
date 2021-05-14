"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { STATUS_CODE } = require("../utils/constants");
const Joi = require("joi");

router.get("/getallposts/:user_id", async (req, res) => {
    console.log(
        "Backend getCommunity ::req.params.communityName",
        req.params.communityName
    );
    let msg = {};
    msg.kafka_service = "get_all_posts";
    msg.user_id = req.params.user_id;
    console.log(msg);

    kafka.make_request("dashboard", msg, function (err, results) {
        if (err) {
            msg.error = err.data;
            // logger.error(msg);
            return res.status(err.status).send(err.data);
        } else if (results) {
            msg.status = results.status;
            // logger.info(msg);
            return res.status(results.status).send(results.data);
        }
    });
});

router.get("/getallcommunities/:user_id", async (req, res) => {
    console.log(
        "Backend getCommunity ::req.params.communityName",
        req.params.communityName
    );
    let msg = {};
    msg.kafka_service = "get_all_communities";
    msg.user_id = req.params.user_id;
    console.log(msg);

    kafka.make_request("dashboard", msg, function (err, results) {
        if (err) {
            msg.error = err.data;
            // logger.error(msg);
            return res.status(err.status).send(err.data);
        } else if (results) {
            msg.status = results.status;
            // logger.info(msg);
            return res.status(results.status).send(results.data);
        }
    });
});

router.get("/getpost/:post_id", async (req, res) => {
    // console.log(
    //     "Backend getCommunity ::req.params.communityName",
    //     req.params.communityName
    // );
    let msg = {};
    msg.kafka_service = "get_post";
    msg.post_id = req.params.post_id;
    console.log(msg);

    kafka.make_request("dashboard", msg, function (err, results) {
        if (err) {
            msg.error = err.data;
            // logger.error(msg);
            return res.status(err.status).send(err.data);
        } else if (results) {
            msg.status = results.status;
            // logger.info(msg);
            return res.status(results.status).send(results.data);
        }
    });
});
module.exports = router;
