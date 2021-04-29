"use strict";
var express = require("express");
var session = require("express-session");
var app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");

const { frontendURI } = require("./utils/config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: frontendURI, credentials: true }));

//Allow Access Control
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", frontendURI);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);
	res.setHeader("Cache-Control", "no-cache");
	next();
});

//use express session to maintain session data
app.use(
	session({
		secret: "cmpe273_kafka_passport_mongo",
		resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
		saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
		duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
		activeDuration: 5 * 60 * 1000,
	})
);

module.exports = app;
