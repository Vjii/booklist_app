var mongoose = require("mongoose");
var User = require("./user");

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
		{title: String, image: String, description: String}

	],
	description: String,
});

module.exports = mongoose.model("Collection", CollectionSchema);
