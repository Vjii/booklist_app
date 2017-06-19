var mongoose = require("mongoose");
var User = require("./user");


var CommentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
		image: String
	},
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
