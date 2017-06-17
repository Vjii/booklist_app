var mongoose = require("mongoose");
var IdeaSchema = require("./idea");
var ClusterSchema = require("./cluster");

var CategorySchema = new mongoose.Schema({
	name: String,
	clusters: [ClusterSchema]
});



module.exports = mongoose.model("Category", CategorySchema);
