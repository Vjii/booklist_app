var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	image: String
});



module.exports = mongoose.model("User", UserSchema);
