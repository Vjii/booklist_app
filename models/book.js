var mongoose = require("mongoose");
var User = require("./user");
var Collection = require("./collection")

var BookSchema = new mongoose.Schema({
	title: String,
  image: String,
	description: String
});

module.exports = mongoose.model("Book", BookSchema);
