var mongoose = require("mongoose");

var IdeaSchema = new mongoose.Schema(
	{
		name: String,
		description: String
	}
);

var Idea = mongoose.model("Idea", IdeaSchema);

module.exports = {
	model: Idea,
	schema: IdeaSchema
}
