var express = require("express"),
router = express.Router(),
Collection = require("../models/collection"),
User = require("../models/user");



//Collections Index Route
router.get("/", function(req, res) {
	Collection.find({}, function(err, collections) {
		if (err) {
			console.log(err);
		} else {
			res.render("collections/index", {collections: collections});
		}
	});
});


//Collections New Route
router.get("/new", function(req, res) {

	res.render("collections/new");

});








module.exports = router;
