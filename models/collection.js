var mongoose = require("mongoose");
var User = require("./user");
var Book = require("./book");

var CollectionSchema = new mongoose.Schema({
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
	description: String,
});

module.exports = mongoose.model("Collection", CollectionSchema);
