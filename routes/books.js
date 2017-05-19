var express = require("express"),
app = require("../app"),
router = express.Router(),
Collection = require("../models/collection"),
User = require("../models/user"),
Book = require("../models/book"),
index = require("../middleware/index");

// New route - show form to add a new book
router.get("/:id/books/new", index.isLoggedIn, function(req, res) {
	var id = req.params.id
	var book_id;
	res.render("books/new", {id: id, book_id: book_id});
});

// Create route - add a new book to books collection
router.post("/:id/books", index.isLoggedIn,function(req, res) {
	var id = req.params.id
	var book = req.body.book
	Collection.findById(id, function(err, collection) {
		if (err) {
			console.log(err);
			res.redirect("/collections/" + id + "/books/new");
		} else {
			Book.model.create(book, function(err, book) {
				if (err) {
					console.log(err);
					res.redirect("/collections/" + id + "/books/new");
				} else {
					console.log(book);
					collection.books.push(book);
					collection.save(function(err, collection) {
						if (err) {
							console.log(err);
						} else {

							res.redirect("/collections/" + id + "/books/" + book.id + "/ideas/new");
						}
					});
				}
			});
		 }
	});
});

// Edit route - show form to edit a book
router.get("/:id/books/:book_id/edit", index.isLoggedIn, function(req, res) {
	var id = req.params.id
	var book_id = req.params.book_id

	Collection.findById(id, function(err, collection) {
		if (err) { return console.log(err) };

		var book = collection.books.id(book_id);
		res.render("books/edit", {id: id, book: book});
	})

});

// Update route - modify a book in the collection
router.put("/:id/books/:book_id",  index.isLoggedIn, function(req, res) {
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
		res.redirect(req.prevPrevPath);

	});
});

// Destroy route - delete a book from the collection
router.delete("/:id/books/:book_id",  index.isLoggedIn, function(req, res) {
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
