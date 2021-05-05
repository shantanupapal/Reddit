const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema(
	{
		communityName: { type: String, trim: true, lowercase: true },
		description: { type: String, trim: true },
		images: [String],
		rules: [
			{
				title: { type: String, trim: true },
				desc: { type: String, trim: true },
			},
		],
		communityMembers: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "user",
				},
				acceptStatus: { type: Number, default: 0 },
			},
		],
		posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
		topics: [String],
		votes: { type: Number },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
		createdAt: { type: Date, default: Date.now },
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("community", communitySchema);

//active status whats that ?

//images whats that ?

//acceptStatus  0- invited/joined, 1- invitationAccepted, 2- invitationRejected.
