"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../utils/passport");
const logger = require("../utils/logger");

router.post("/addRule", checkAuth, async (req, res) => {
  let msg = {};
  msg = req.body;
  msg.route = "addRule";

  kafka.make_request("mycommunity", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.data);
    }
  });
});

router.post("/updateDesc", checkAuth, async (req, res) => {
  let msg = {};
  msg = req.body;
  msg.route = "updateDesc";

  kafka.make_request("mycommunity", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.data);
    }
  });
});

router.post("/deleteCommunity", checkAuth, async (req, res) => {
  let msg = {};
  msg = req.body;
  msg.route = "deleteCommunity";

  kafka.make_request("mycommunity", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.data);
    }
  });
});

router.get("/getCommunityDetails", checkAuth, async (req, res) => {
  let msg = {};
  msg = req.body;
  msg.route = "getCommunityDetails";

  kafka.make_request("mycommunity", msg, function (err, results) {
    if (err) {
      msg.error = err.data;
      logger.error(msg);
      return res.status(err.status).send(err.data);
    } else {
      msg.status = results.status;
      logger.info(msg);
      return res.status(results.status).send(results.data);
    }
  });
});

module.exports = router;
