var express = require("express"),
router = express.Router(),
index = require("../middleware/index"),
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

router.get("/new", function(req, res) {
	res.render("collections/new");
});


router.post("/", function(req, res) {
	var title = req.body.title;
	var user = req.user;
	Collection.create({title: title }, function(err, collection) {
		if(err) {
			console.log(err);
			return res.redirect("/collections/new");
		}
		collection.author = user;
		collection.save();
		console.log(collection.author.username);
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
