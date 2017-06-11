var mongoose = require("mongoose");

var IdeaSchema = new mongoose.Schema(
	{
		name: String,
		description: String
	}
);

var Idea = {
	schema: IdeaSchema,
	model: mongoose.model("Idea", IdeaSchema)
}

module.exports = Idea;
