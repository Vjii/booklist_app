var mongoose = require("mongoose");
var User = require("./user");
var Collection = require("./collection")

var BookSchema = new mongoose.Schema({
	title: String,
  image: String,
	ideaOne: String,
	descriptionOne: String,
	ideaTwo: String,
	descriptionTwo: String,
	ideaThree: String,
	descriptionThree: String
});

module.exports = mongoose.model("Book", BookSchema);
