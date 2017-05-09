var mongoose = require("mongoose");
var User = require("./user");
var Book = require("./book");
var Comment = require("./comment");

var CollectionSchema = new mongoose.Schema({
	title: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
		image: String
	},
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book"
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	description: String
});

module.exports = mongoose.model("Collection", CollectionSchema);
