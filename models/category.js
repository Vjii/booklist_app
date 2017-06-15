var mongoose = require("mongoose");
var IdeaSchema = require("./idea");

var CategorySchema = new mongoose.Schema({
	name: String,
	sources: [
		{
			name: String,
			kind: String,
			image: String,
			ideas: [IdeaSchema]
		}
	]
});



module.exports = mongoose.model("Category", CategorySchema);
