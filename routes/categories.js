var express = require("express"),
app = require("../app"),
router = express.Router(),
Category = require("../models/category"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");

// New route - show form to add a new book
router.get("/:id/categories/new", middleware.checkOwnership, function(req, res) {

	var category_id;
	res.render("categories/new", {id: req.params.id, category_id: category_id});
});



// Create route - add a new category to the categories collection
router.post("/:id/categories", middleware.checkOwnership, function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if (err) {
			console.log(err);
			return res.redirect("/collections/" + req.params.id + "/categories/new");
		}

		Category.create(req.body.category, function(err, category) {
			if (err) {
				console.log(err);
				return res.redirect("/collections/" + req.params.id + "/categories/new");
			}
				console.log(category);
				collection.categories.push(category);
				collection.save();

				res.redirect("/collections/" + req.params.id + "/categories/" + category._id + "/ideas/new");
		})

	});
});

// Edit route - show form to edit a book
router.get("/:id/categories/:category_id/edit", middleware.checkOwnership, function(req, res) {
	var id = req.params.id
	var category_id = req.params.category_id

	Collection.findById(id, function(err, collection) {
		if (err) { return console.log(err) };

		var category = collection.books.id(category_id);
		res.render("books/edit", {id: id, category: category});
	})

});

// Update route - modify a book in the collection
router.put("/:id/categories/:category_id",  middleware.checkOwnership, function(req, res) {
	var id = req.params.id
	var category_id = req.params.category_id;
	var category = req.body.book;

	Collection.findById(id, function(err, collection) {
		if (err) {return console.log(err); }
		var bookFound = collection.books.id(category_id);
		console.log(req.body.title);
		bookFound.title = req.body.category.title
		bookFound.image = req.body.category.image
		bookFound.save();
		collection.save();
	});
});

// Destroy route - delete a book from the collection
router.delete("/:id/categories/:category_id",  middleware.checkOwnership, function(req, res) {

	var id = req.params.id
	var category_id = req.params.category_id

	Collection.findById(id, function(err, collection) {
		if (err) {return console.log(err); }


		var category = collection.books.id(category_id);
		collection.books.pull(category);
		collection.save();

		res.redirect("/collections/" + id);

	});


});

module.exports = router;
