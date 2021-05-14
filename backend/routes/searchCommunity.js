"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.get("/getAllCommunities/", async (req, res) => {
  console.log("Backend getAllCommunities for community search page");
  let msg = {};
  msg.route = "search_communities";

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

router.post("/updateVote", async (req, res) => {
  console.log("Backend update vote for community search page", req.body);
  let msg = {};
  msg = req.body;
  msg.route = "vote_community";

  kafka.make_request("vote", msg, function (err, results) {
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
