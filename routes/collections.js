var express = require("express"),
router = express.Router(),
Collection = require("../models/collection"),
User = require("../models/user"),
Book = require("../models/book");



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


//Collections - Show Route
router.get("/:id", function(req, res) {
	var id = req.params.id
	Collection.findById(id).populate("books").exec(function(err, collection){
		res.render("collections/show", {collection: collection});
	});
});









module.exports = router;
