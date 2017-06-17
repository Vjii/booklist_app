var express = require("express"),
app = require("../app"),
router = express.Router(),
User = require("../models/user"),
IdeaSchema = require("../models/idea"),
ClusterSchema = require("../models/cluster"),
Category = require("../models/category"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");


// New ideas cluster Route
router.get("/:id/categories/:category_id/clusters/new", middleware.checkOwnership, function(req, res) {
		console.log("ROUTE?")
		Collection.findById(req.params.id, function(err, collection) {
			if (err) {
				console.log(err)
				return res.back();
			}
			Category.findById(req.params.category_id, function(err, category) {
				if (err) {
					console.log(err)
					return res.back();
				}

				res.render("clusters/new", {collection: collection, category: category})

			});
		})
});

// Create ideas cluster Route
router.post("/:id/categories/:category_id/clusters", middleware.checkOwnership, function(req, res) {

		Collection.findById(req.params.id, function(err, collection) {
			if (err) {
				console.log(err)
				return res.back();
			}
			Category.findById(req.params.category_id, function(err, category) {
				if (err) {
					console.log(err)
					return res.back();
				}

				var cluster = {
					source: req.body.source
				}

				category.clusters.push(cluster);
				category.save();
				res.redirect("/collections/" + req.params.id);
			});
		})
});


// Edit ideas cluster Route
router.get("/:id/categories/:category_id/clusters/:cluster_id/edit", middleware.checkOwnership, function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
			if (err) {
				console.log(err)
				return res.back();
			}

		Category.findById(req.params.category_id, function(err, category) {
			if (err) {
				console.log(err)
				return res.back();
			}

			var ideaCluster = category.clusters.id(req.params.cluster_id);

			res.render("clusters/edit", {collection: collection, category: category, cluster: ideaCluster});
		});
	});
});


// Update ideas cluster Route
router.put("/:id/categories/:category_id/clusters/:cluster_id", middleware.checkOwnership, function(req, res) {

		Category.findById(req.params.category_id, function(err, category) {
			if (err) {
				console.log(err)
				return res.back();
			}

			var ideaCluster = category.clusters.id(req.params.cluster_id);
			ideaCluster.source = req.body.source;
			category.save();
			console.log(ideaCluster)

			res.redirect("/collections/" + req.params.id);
		});
});

router.delete("/:id/categories/:category_id/clusters/:cluster_id", middleware.checkOwnership, function(req, res) {

		Category.findById(req.params.category_id, function(err, category) {
			if (err) {
				console.log(err)
				return res.back();
			}

			var ideaCluster = category.clusters.id(req.params.cluster_id);
			category.clusters.pull(ideaCluster);
			category.save();

			res.redirect("/collections/" + req.params.id);
		});
});

module.exports = router;
