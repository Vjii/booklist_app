var express = require("express"),
router = express.Router(),
index = require("../middleware/index"),
Collection = require("../models/collection"),
User = require("../models/user"),
Book = require("../models/book");



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
router.get("/new", index.isLoggedIn, function(req, res) {
	res.render("collections/new");
});

//Collections Create Route - add collection
router.post("/", function(req, res) {
	var title = req.body.title;

	Collection.create({title: title }, function(err, collection) {
		if(err) {
			console.log(err);
			return res.redirect("/collections/new");
		}
		collection.author.id = req.user.id;
		collection.author.username = req.user.username;
		collection.author.image = req.user.image;

		collection.save();
		console.log("USER: " + req.user)
		console.log("COLLECTION: " + collection)
		res.redirect("/collections/" + collection.id)
	});
});



//Collections - Show Route
router.get("/:id", function(req, res) {
	var id = req.params.id
	Collection.findById(id).populate("books comments").exec(function(err, collection){
		if(err) {

		} else {
			res.render("collections/show",{collection: collection})
		}
	})
});

module.exports = router;
