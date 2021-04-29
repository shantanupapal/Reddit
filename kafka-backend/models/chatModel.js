"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const msg = {
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	msgContent: {
		type: String,
		trim: true,
	},
	msgTime: {
		type: Date,
	},
};

//Schema
const chatSchema = new schema(
	{
		user1: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		user2: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		message: [msg],
	},
	{ versionKey: false }
);

module.exports = mongoose.model("chat", chatSchema);
