var mongoose = require("mongoose");
var IdeaSchema = require("./idea");


var ClusterSchema = new mongoose.Schema({
	source: {
		name: String,
		label: String,
		image: String
	},
	ideas: [IdeaSchema]
});

module.exports = ClusterSchema;
