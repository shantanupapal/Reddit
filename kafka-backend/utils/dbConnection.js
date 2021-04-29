"use strict";
const mongoose = require("mongoose");
const { mongoDBURI } = require("./config");

//Mongo Connection
const connectMongoDB = async () => {
	const options = {
		poolSize: 10,
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	};

	try {
		await mongoose.connect(mongoDBURI, options);
		console.log("MongoDB connected");
	} catch (err) {
		console.log("Could not connect to MongoDB", err);
	}
};

module.exports = connectMongoDB;
