var express = require("express"),
app = require("../app"),
router = express.Router(),
Book = require("../models/book"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");

// New route - show form to add a new book
router.get("/:id/books/new", middleware.checkOwnership, function(req, res) {

	var book_id;
	res.render("books/new", {id: req.params.id, book_id: book_id});
});

// Create route - add a new book to books collection
router.post("/:id/books", middleware.checkOwnership, function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if (err) {
			console.log(err);
			res.redirect("/collections/" + req.params.id + "/books/new");
		} else {
				Book.model.create(req.body.book, function(err, book) {
					if (err) {
						console.log(err);
						res.redirect("/collections/" + req.params.id + "/books/new");
					} else {
						console.log(book);
						collection.books.push(book);
						collection.save();

						res.redirect("/collections/" + req.params.id + "/books/" + book._id + "/ideas/new");
					};
				})
		};
	});
});

// Edit route - show form to edit a book
router.get("/:id/books/:book_id/edit", middleware.checkOwnership, function(req, res) {
	var id = req.params.id
	var book_id = req.params.book_id

	Collection.findById(id, function(err, collection) {
		if (err) { return console.log(err) };

		var book = collection.books.id(book_id);
		res.render("books/edit", {id: id, book: book});
	})

});

// Update route - modify a book in the collection
router.put("/:id/books/:book_id",  middleware.checkOwnership, function(req, res) {
	var id = req.params.id
	var book_id = req.params.book_id;
	var book = req.body.book;

	Collection.findById(id, function(err, collection) {
		if (err) {return console.log(err); }
		var bookFound = collection.books.id(book_id);
		console.log(req.body.title);
		bookFound.title = req.body.book.title
		bookFound.image = req.body.book.image
		bookFound.save();
		collection.save();
	});
});

// Destroy route - delete a book from the collection
router.delete("/:id/books/:book_id",  middleware.checkOwnership, function(req, res) {

	var id = req.params.id
	var book_id = req.params.book_id

	Collection.findById(id, function(err, collection) {
		if (err) {return console.log(err); }


		var book = collection.books.id(book_id);
		collection.books.pull(book);
		collection.save();

		res.redirect("/collections/" + id);

	});


});

module.exports = router;
