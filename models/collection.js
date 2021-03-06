var mongoose = require("mongoose");
var User = require("./user");
var Idea = require("./idea");
var Category = require("./category");
var CommentSchema = require("./comment");


var CollectionSchema = new mongoose.Schema({
	title: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
		image: String
	},
	categories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category"
		}
	],
	comments: [CommentSchema]
});

module.exports = mongoose.model("Collection", CollectionSchema);
