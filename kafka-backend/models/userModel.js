const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		userName: { type: String, trim: true },
		email: { type: String, trim: true, lowercase: true },
		gender: { type: String, trim: true },
		location: { type: String },
		description: { type: String, trim: true },
		userImage: { type: String },
		topics: [{ name: { type: String }, value: { type: String } }],
		createdAt: { type: Date, default: Date.now },
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("user", userSchema);

//location type needes to be finalized.
