var mongoose = require("mongoose");
var User = require("./user");
var Idea = require("./idea");
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
	books: [Book.schema],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Collection", CollectionSchema);
