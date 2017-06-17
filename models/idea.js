var mongoose = require("mongoose");

var IdeaSchema = new mongoose.Schema({
	name: String,
	description: String
});


module.exports = IdeaSchema;
