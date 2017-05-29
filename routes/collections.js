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
router.get("/new", index.checkLoggedIn, function(req, res) {
	res.render("collections/new");
});

//Collections Create Route - add collection
router.post("/", index.checkLoggedIn, function(req, res) {

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
		console.log("USER: " + req.user)
		console.log("COLLECTION: " + collection)
		res.redirect("/collections/" + collection.id)
	});
});

//Collections - Show Route
router.get("/:id", function(req, res) {
	var id = req.params.id
	Collection.findById(id).populate("books comments").exec(function(err, collection){
		if (err) {return console.log(err);}


		console.log("COLLECTION.BOOKS: " + collection.books)
		res.render("collections/show", {collection: collection})

	})
});

module.exports = router;
