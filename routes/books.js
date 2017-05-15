var express = require("express"),
router = express.Router(),
Collection = require("../models/collection"),
User = require("../models/user"),
Book = require("../models/book"),
index = require("../middleware/index");

// New route - show form to add a new book
router.get("/:id/books/new", index.isLoggedIn, function(req, res) {
	var id = req.params.id
	res.render("books/new", {id: id});
});

// Create route - add a new book to books collection
router.post("/:id/books", index.isLoggedIn,function(req, res) {
	var id = req.params.id
	var book = req.body.book
	console.log(book);
	Collection.findById(id, function(err, collection) {
		if (err) {
			console.log(err);
			res.redirect("/collections/" + id + "/books/new");
		} else {
			Book.create(book, function(err, book) {
				if (err) {
					console.log(err);
					res.redirect("/collections/" + id + "/books/new");
				} else {
					collection.books.push(book);
					collection.save(function(err, collection) {
						if (err) {
							console.log(err);
						} else {
							res.redirect("/collections/" + id);
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
	Book.findById(book_id, function(err, book) {
		if (err) {
			console.log(err);
		} else {
			res.render("books/edit", {id: id, book: book});
		}
	});
});

// Update route - modify a book in the collection
router.put("/:id/books/:book_id",  index.isLoggedIn, function(req, res) {
	var id = req.params.id
	var book_id = req.params.book_id
	Book.findByIdAndUpdate(book_id, req.body.book, function(err, book) {
		if (err) {
			console.log(err);
			res.redirect("/" + id + /books/ + book_id + "/edit")
		} else {
			res.redirect("/collections/" + id);
		}
	});
});

// Destroy route - delete a book from the collection
router.delete("/:id/books/:book_id",  index.isLoggedIn, function(req, res) {
	var book_id = req.params.book_id
	Book.findByIdAndRemove(book_id, function(err) {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("back");
		}
	})
});

module.exports = router;
