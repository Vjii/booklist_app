var mongoose = require("mongoose");
var Idea = require("./idea");

var BookSchema = new mongoose.Schema({
	title: String,
  image: String,
	ideas: [Idea.schema]
});

var Book = mongoose.model("Book", BookSchema);

module.exports = {
	model: Book,
	schema: BookSchema
}
