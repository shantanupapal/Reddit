const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communitySchema = new Schema(
	{
		communityName: { type: String, trim: true },
		description: { type: String, trim: true },
		images: [string],
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
				acceptStatus: { type: Boolean, default: false },
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

//Once  user joins community --he/she will get added to communityMembers with acceptStatus=false which means he has requested to join.

//active status whats that ?

//images whats that ?

//acceptStatus can also be kept as enum or string with multiple values eg. joined, invitationAccepted, invitationRejected.
