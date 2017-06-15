var mongoose = require("mongoose");
var User = require("./user");
var Idea = require("./idea");
var Category = require("./category");
var Comment = require("./comment");


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
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Collection", CollectionSchema);
