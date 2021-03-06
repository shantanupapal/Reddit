"use strict";
var connection = new require("./kafka/connection");
var connectMongoDB = require("./utils/dbConnection");

//import topics files
const signupService = require("./services/signup");
const loginService = require("./services/login");
const profileService = require("./services/profile");
const myCommunityService = require("./services/myCommunity");
const createCommunityService = require("./services/createCommunity");
const moderationService = require("./services/moderation");
const communityHomeService = require("./services/communityHome");
const imageUploadService = require("./services/imageUpload");
const chatService = require("./services/chat");
const invitationService = require("./services/invitation");
const communityHomeService1 = require("./services/communityHome1");
const viewProfileService = require("./services/viewProfile/viewprofile");
const voteService = require("./services/votes");
const dashboardService = require("./services/dashboard");

//MongoDB connection
connectMongoDB();

//Handle topic request
const handleTopicRequest = (topic_name, fname) => {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("Kafka Server is running ");
    consumer.on("message", function (message) {
        console.log("Message received for " + topic_name);
        var data = JSON.parse(message.value);
        fname.handle_request(data.data, (err, res) => {
            response(data, res, err, producer);
            return;
        });
    });
};

const response = (data, res, err, producer) => {
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res,
                err: err,
            }),
            partition: 0,
        },
    ];
    producer.send(payloads, function (err, data) {
        if (err) {
            console.log("Error when producer sending data", err);
        } else {
            console.log(data);
        }
    });
    return;
};

// Topics
handleTopicRequest("signup", signupService);
handleTopicRequest("login", loginService);
handleTopicRequest("profile", profileService);
handleTopicRequest("mycommunity", myCommunityService);
handleTopicRequest("createCommunity", createCommunityService);
handleTopicRequest("moderation", moderationService);
handleTopicRequest("chat", chatService);
handleTopicRequest("invitation", invitationService);
handleTopicRequest("communityHome", communityHomeService);
handleTopicRequest("communityHome1", communityHomeService1);
handleTopicRequest("images", imageUploadService);
handleTopicRequest("viewprofile", viewProfileService);
handleTopicRequest("vote", voteService);
handleTopicRequest("dashboard", dashboardService);
