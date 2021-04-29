const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		content: { type: String, trim: true },
		votes: { type: Number },
		commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		commentedAt: { type: Date, default: Date.now },
		nestedComments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("comment", commentSchema);
