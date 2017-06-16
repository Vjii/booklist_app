var express = require("express"),
app = require("../app"),
router = express.Router(),
User = require("../models/user"),
Idea = require("../models/idea"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");

// REMOVE ALL THESE VARS LATER, IT LOOKS MESSY AF

//Index route
router.get("/:id/categories/:category_id/ideas", middleware.checkOwnership, function(req, res) {


	Idea.find({}, function(err, ideas) {
		if (err){
			console.log(err);
			return res.back();
		}

		Category.findById(req.params.category_id, function(err, category) {
			if(err) {
				return console.log(err);
			}
			res.render("categories/new", {id: req.params.id, category: category});
		});
	});
});


// New Route
router.get("/:id/categories/:category_id/ideas/new", middleware.checkOwnership, function(req, res) {

		Collection.findById(req.params.id, function(err, collection) {
			if (err) {return console.log(err);}

			var book = collection.books.id(req.params.category_id);

			res.render("ideas/new", {collection: collection, book: book});
		});
});


// Create Route
router.post("/:id/categories/:category_id/ideas", middleware.checkOwnership, function(req, res) {
	var id = req.params.id
	var category_id = req.params.category_id;
	var idea = req.body.idea;

	Collection.findById(id, function(err, collection) {
		if(err) {
			return console.log(err);
		}
		var book = collection.books.id(category_id);
		book.ideas.push(idea);
		book.save();
		collection.save();
		res.redirect("/collections/" + id + /categories/ + category_id + "/ideas/new");
	});
});

// Edit Route
router.get("/:id/categories/:category_id/ideas/:idea_id/edit", middleware.checkOwnership,  function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if(err) {return console.log(err);}
		var book = collection.books.id(req.params.category_id);
		var idea = book.ideas.id(req.params.idea_id);
		res.render("ideas/edit", {id: req.params.id, book: book, idea: idea});
	});
});

// Update Route
router.put("/:id/categories/:category_id/ideas/:idea_id", middleware.checkOwnership, function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if(err) { return console.log(err); }
		var book = collection.books.id(req.params.category_id);
		var idea = book.ideas.id(req.params.idea_id);
		idea.name = req.body.idea.name;
		idea.description = req.body.idea.description;
		idea.save();
		book.save();
		collection.save();
	});
});


// Delete Route
router.delete("/:id/categories/:category_id/ideas/:idea_id", middleware.checkOwnership, function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if (err) { return console.log(err); }

		var book = collection.books.id(req.params.category_id);
		var idea = book.ideas.id(req.params.idea_id);
		book.ideas.pull(idea);
		book.save();
		collection.save();
		res.back();
	});
});


module.exports = router;
