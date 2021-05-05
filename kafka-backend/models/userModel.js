const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		userName: { type: String, trim: true },
		//password: { type: String },
		email: { type: String, trim: true },
		phone: { type: String, trim: true },
		gender: { type: String, trim: true },
		location: { type: String },
		description: { type: String, trim: true },
		userImage: { type: String },
		topics: [String],
		createdAt: { type: Date, default: Date.now },
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("user", userSchema);

//location type needes to be finalized.
