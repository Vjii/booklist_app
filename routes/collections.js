var express = require("express"),
router = express.Router(),
User = require("../models/user"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");


//Collections Index Route
router.get("/", function(req, res) {
	Collection.find({}, function(err, collections) {
		if(err) {
			console.log(err);
		} else {
			res.render("collections/index", {collections: collections});
		}
	});
});

//Collections New Route - form to add collection
router.get("/new", middleware.checkLoggedIn, function(req, res) {
	res.render("collections/new");
});

//Collections Create Route - add collection
router.post("/", middleware.checkLoggedIn, function(req, res) {

	Collection.create({}, function(err, collection) {
		if(err) {
			console.log(err);
			return res.redirect("/collections/new");
		}
		collection.title = req.body.title;
		collection.author = {
			id: req.user._id,
			username: req.user.username,
			image: req.user.image
		}

		collection.save();
		res.redirect("/collections/" + collection.id);
	});
});

//Collections - Show Route
router.get("/:id", function(req, res) {

	Collection.findById(req.params.id).populate("books comments").exec(function(err, collection) {
		if(err) {return console.log(err);}

		res.render("collections/show", {collection: collection});
	});

});

module.exports = router;
