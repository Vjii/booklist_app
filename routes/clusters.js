var express = require("express"),
app = require("../app"),
router = express.Router(),
User = require("../models/user"),
IdeaSchema = require("../models/idea"),
ClusterSchema = require("../models/cluster"),
Category = require("../models/category"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");


// New cluster Route
router.get("/:id/categories/:category_id/clusters/new", middleware.checkOwnership, middleware.checkClustersLimit, function(req, res) {
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

				res.render("clusters/new", {id: req.params.id, category: category})

			});
		})
});

// Create ideas cluster Route
router.post("/:id/categories/:category_id/clusters", middleware.checkOwnership, middleware.checkClustersLimit, function(req, res) {

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

				var ideasCluster = {
					source: req.body.source
				}

				category.clusters.push(ideasCluster);
				category.save();
				var clusterId = category.clusters[category.clusters.length - 1].id;

				req.session.activeCategory = category.name;

				res.render("clusters/new", {id: req.params.id, category: category});
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

			req.session.activeCategory = category.name;

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

			var ideasCluster = category.clusters.id(req.params.cluster_id);
			ideasCluster.source = req.body.source;
			category.save();
			console.log(category + " CATEGORY")

			res.render("clusters/new", {id: req.params.id, category: category});
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
