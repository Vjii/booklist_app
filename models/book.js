var mongoose = require("mongoose");
var Idea = require("./idea");

var Idea = Idea.schema;

var BookSchema = new mongoose.Schema({
	title: String,
	description: String,
	authors: String,
  image: String,
	ideas: [
		{
			name: String,
			description: String
		}
	]
});

var Book = {
	schema: BookSchema,
	model: mongoose.model("Book", BookSchema)
}
module.exports = Book;
