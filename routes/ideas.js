var express = require("express"),
app = require("../app"),
router = express.Router(),
User = require("../models/user"),
Idea = require("../models/idea"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");

// REMOVE ALL THESE VARS LATER, IT LOOKS MESSY AF

//Index route
router.get("/:id/books/:book_id/ideas", middleware.checkOwnership, function(req, res) {
	var id = req.params.id
	var book_id = req.params.book_id;
	Idea.find({}, function(err, ideas) {
		if (err){
			return console.log(err);
		}
		Book.findById(book_id, function(err, book){
			if(err) {
				return console.log(err);
			}
			res.render("books/new", {id: id, book: book, book_id: book_id});
		});
	});
});


// New Route
router.get("/:id/books/:book_id/ideas/new", middleware.checkOwnership, function(req, res) {

		Collection.findById(req.params.id, function(err, collection) {
			if (err) {return console.log(err);}

			var book = collection.books.id(req.params.book_id);

			res.render("ideas/new", {collection: collection, book: book});
		});
});


// Create Route
router.post("/:id/books/:book_id/ideas", middleware.checkOwnership, function(req, res) {
	var id = req.params.id
	var book_id = req.params.book_id;
	var idea = req.body.idea;

	Collection.findById(id, function(err, collection) {
		if(err) {
			return console.log(err);
		}
		var book = collection.books.id(book_id);
		book.ideas.push(idea);
		book.save();
		collection.save();
		res.redirect("/collections/" + id + /books/ + book_id + "/ideas/new");
	});
});

// Edit Route
router.get("/:id/books/:book_id/ideas/:idea_id/edit", middleware.checkOwnership,  function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if(err) {return console.log(err);}
		var book = collection.books.id(req.params.book_id);
		var idea = book.ideas.id(req.params.idea_id);
		res.render("ideas/edit", {id: req.params.id, book: book, idea: idea});
	});
});

// Update Route
router.put("/:id/books/:book_id/ideas/:idea_id", middleware.checkOwnership, function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if(err) { return console.log(err); }
		var book = collection.books.id(req.params.book_id);
		var idea = book.ideas.id(req.params.idea_id);
		idea.name = req.body.idea.name;
		idea.description = req.body.idea.description;
		idea.save();
		book.save();
		collection.save();
	});
});


// Delete Route
router.delete("/:id/books/:book_id/ideas/:idea_id", middleware.checkOwnership, function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if (err) { return console.log(err); }

		var book = collection.books.id(req.params.book_id);
		var idea = book.ideas.id(req.params.idea_id);
		book.ideas.pull(idea);
		book.save();
		collection.save();
		res.back();
	});
});


module.exports = router;
