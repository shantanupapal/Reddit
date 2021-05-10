"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { STATUS_CODE } = require("../utils/constants");
const Joi = require("joi");

// const isMessageValid = (message_request) => {
//     const chatSchema = {
//         sender: Joi.string().required(),
//         receiver: Joi.string().required(),
//         msgContent: Joi.string().required(),
//         chat_id: Joi.string(),
//     };

//     return chatSchema.validate(message_request);
// };

router.post("/sendmessage", async (req, res) => {
    let message = req.body;
    console.log("new message", req.body);

    // const { err } = isMessageValid(req.body);
    // if (err) {
    //     return res.status(STATUS_CODE.BAD_REQUEST).send(err.details[0].message);
    // }

    message.kafka_service = "send_message";

    kafka.make_request("chat", message, function (err, results) {
        if (err) {
            return res.status(err.status).send(err.data);
        } else {
            return res.status(results.status).send(results.data);
        }
    });
});

router.get("/getallchats/:user_id", async (req, res) => {
    let message = req.body;
    message.kafka_service = "get_allChats_forUser";
    message.user_id = req.params.user_id;
    console.log("user_id", message.user_id);

    kafka.make_request("chat", message, function (err, results) {
        if (err) {
            return res.status(err.status).send(err.data);
        } else {
            return res.status(results.status).send(results.data);
        }
    });
});

router.get("/searched/:user_id/:target_id", async (req, res) => {
    let message = {};
    message.route = "get_SearchedConversation";
    message.user_id = req.params.user_id;
    message.target_id = req.params.target_id;

    kafka.make_request("messages", message, function (err, results) {
        if (err) {
            message.error = err.data;
            logger.error(message);
            return res.status(err.status).send(err.data);
        } else {
            message.status = results.status;
            logger.info(message);
            return res.status(results.status).send(results.data);
        }
    });
});

router.get("/getchat/:user_id/:chat_id", async (req, res) => {
    let message = req.body;
    message.kafka_service = "get_user_chat";
    message.user_id = req.params.user_id;
    message.chat_id = req.params.chat_id;

    kafka.make_request("chat", message, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        } else {
            res.status(results.status).send(results.data);
        }
    });
});

router.get("/getallusers", async (req, res) => {
    let message = {};
    message.kafka_service = "get_all_users";
    // message.user_id = req.params.user_id;
    // message.chat_id = req.params.chat_id;

    kafka.make_request("chat", message, function (err, results) {
        if (err) {
            res.status(err.status).send(err.data);
        } else {
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = router;
