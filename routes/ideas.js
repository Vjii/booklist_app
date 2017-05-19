var express = require("express"),
app = require("../app"),
router = express.Router(),
Collection = require("../models/collection"),
User = require("../models/user"),
Book = require("../models/book"),
Idea = require("../models/idea"),
index = require("../middleware/index");

// REMOVE ALL THESE VARS LATER, IT LOOKS MESSY AF

router.get("/:id/books/:book_id/ideas", index.isLoggedIn, function(req, res) {
	var id = req.params.id
	var book_id = req.params.book_id;
	Idea.model.find({}, function(err, ideas) {
		if (err){
			return console.log(err);
		}
		Book.model.findById(book_id, function(err, book){
			if(err) {
				return console.log(err);
			}
			res.render("books/new", {id: id, book: book, book_id: book_id});
		});
	});
});


// New Route
router.get("/:id/books/:book_id/ideas/new", function(req, res) {
	Collection.findById(req.params.id, function(err, collection) {
		if (err) {return console.log(err); }
		var book = collection.books.id(req.params.book_id);
		res.render("ideas/new", {id: req.params.id, book: book})
	});
});


// Create Route
router.post("/:id/books/:book_id/ideas", function(req, res) {
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
router.get("/:id/books/:book_id/ideas/:idea_id/edit", function(req, res) {
	var id = req.params.id;
	var book_id = req.params.book_id;
	var idea_id = req.params.idea_id;
	console.log('IDEA ID: '  + idea_id);

	Collection.findById(id, function(err, collection) {
		if(err) {return console.log(err);}

		var book = collection.books.id(book_id);
		var idea = book.ideas.id(idea_id);
		res.render("ideas/edit", {id: collection.id, book_id: book.id, idea: idea});
	});
});

// Update Route
router.put("/:id/books/:book_id/ideas/:idea_id", function(req, res) {
	var id = req.params.id
	var book_id = req.params.book_id;
	var idea_id = req.params.idea_id
	console.log(idea_id);

	Collection.findById(id, function(err, collection) {
		if(err) { return console.log(err); }
		var book = collection.books.id(book_id);
		var idea = book.ideas.id(idea_id);
		idea.name = req.body.idea.name;
		idea.description = req.body.idea.description;
		idea.save();
		book.save();
		collection.save();
		res.redirect(req.prevPrevPath);
	});
});


// Update Route
router.delete("/:id/books/:book_id/ideas/:idea_id", function(req, res) {
	var id = req.params.id;
	var book_id = req.params.book_id;
	var idea_id = req.params.idea_id;

	Collection.findById(id, function(err, collection) {
		if (err) { return console.log(err); }

		var book = collection.books.id(book_id);
		var idea = book.ideas.id(idea_id);
		book.ideas.pull(idea);
		book.save();
		collection.save();
		res.back();
	});
});


module.exports = router;
