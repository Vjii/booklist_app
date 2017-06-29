var express = require("express"),
app = require("../app"),
router = express.Router(),
Category = require("../models/category"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");

// New category route
router.get("/:id/categories/new", middleware.checkOwnership, middleware.checkCategoriesLimit, function(req, res) {

	var category_id;
	res.render("categories/new", {id: req.params.id, category_id: category_id});
});



// Create a category route
router.post("/:id/categories", middleware.checkOwnership, middleware.checkCategoriesLimit, function(req, res) {

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

				collection.categories.push(category);
				collection.save();

				req.session.activeCategory = category.name;

				res.redirect("/collections/" + req.params.id + "/categories/" + category.id + "/clusters/new");
		})
	});
});


//Categories - Show Route
router.get("/:id/categories/:category_id", function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {

		Category.findById(req.params.category_id, function(err, category) {
			if(err) {
				console.log(err)
				return res.back();
			}

			res.render("categories/show", {collection: collection, category: category});
		});
	});

});

// Edit category route
router.get("/:id/categories/:category_id/edit", middleware.checkOwnership, function(req, res) {

		Category.findById(req.params.category_id, function(err, category) {
			if(err) {return console.log(err)}

			req.session.activeCategory = category.name;

			res.render("categories/edit", {id: req.params.id, category: category});
		})
});

// Update category route
router.put("/:id/categories/:category_id",  middleware.checkOwnership, function(req, res) {

	Category.findById(req.params.category_id, function(err, category) {
		if (err) {return console.log(err)}

		category.name = req.body.name;
		category.save();

		req.session.activeCategory = category.name;

		res.redirect("/collections/" + req.params.id);
	})
});

// Destroy category route
router.delete("/:id/categories/:category_id",  middleware.checkOwnership, function(req, res) {

	Category.findByIdAndRemove(req.params.category_id, function(err) {
		if(err) {return console.log(err)}

		req.session.activeCategory = null;
		res.redirect("/collections/" + req.params.id);
	})


});

module.exports = router;
