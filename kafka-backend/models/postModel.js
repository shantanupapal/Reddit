const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: { type: String, trim: true },
		body: { type: String, trim: true },
		votes: { type: Number },
		link: { type: String },
		image: { type: String },
		comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		createdAt: { type: Date, default: Date.now },
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("post", postSchema);
