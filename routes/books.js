var express = require("express"),
router = express.Router(),
Collection = require("../models/collection"),
User = require("../models/user");



//Books in a collection - Index Route
router.get("/:id", function(req, res) {
	var id = req.params.id
	Collection.findById(id, function(err, collection) {
		if (err) {
			console.log(err);
			res.redirect("/collections");
		} else {
			res.render("collections/show", {collection: collection});
		}
	});
});


//Show form to add new book to collection - New Route
// router.get("/:id/new", function(req, res) {
// 	res.render("new")

// });


module.exports = router;
