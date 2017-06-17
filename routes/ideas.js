var express = require("express"),
app = require("../app"),
router = express.Router(),
User = require("../models/user"),
IdeaSchema = require("../models/idea"),
ClusterSchema = require("../models/cluster"),
Category = require("../models/category"),
Collection = require("../models/collection"),
middleware = require("../middleware/index");

// REMOVE ALL THESE VARS LATER, IT LOOKS MESSY AF


// New Route
router.get("/:id/categories/:category_id/clusters/:cluster_id/ideas/new", middleware.checkOwnership, function(req, res) {

		Category.findById(req.params.category_id, function(err, category) {
			if (err) {
		   	console.log(err);
			}

			var ideasCluster = category.clusters.id(req.params.cluster_id);
			res.render("ideas/new", {id: req.params.id, category_id: req.params.category_id, cluster: ideasCluster})

		});
});


// Create Route
router.post("/:id/categories/:category_id/clusters/:cluster_id/ideas", middleware.checkOwnership, function(req, res) {

	Category.findById(req.params.category_id, function(err, category) {
		if(err) {	return console.log(err);}

		var idea = req.body.idea;
		var ideasCluster = category.clusters.id(req.params.cluster_id);
		ideasCluster.ideas.push(idea);

		category.save();
		res.redirect("/collections/" + req.params.id);
	});
});

// Edit an idea Route
router.get("/:id/categories/:category_id/clusters/:cluster_id/ideas/:idea_id/edit", middleware.checkOwnership, function(req, res) {

	Category.findById(req.params.category_id, function(err, category) {
		if(err) {
			console.log(err);
			return res.back();
		}

		var ideasCluster = category.clusters.id(req.params.cluster_id);
		var idea = ideasCluster.ideas.id(req.params.idea_id);

		res.render("ideas/edit", {id: req.params.id, category_id: req.params.category_id, cluster_id: req.params.cluster_id, idea: idea});
	});
});


// Update an idea route
router.put("/:id/categories/:category_id/clusters/:cluster_id/ideas/:idea_id", middleware.checkOwnership, function(req, res) {
	var ideaEdited = req.body.idea;

	Category.findById(req.params.category_id, function(err, category) {
		if(err) {return console.log(err)}

		var ideasCluster = category.clusters.id(req.params.cluster_id);
		var idea = ideasCluster.ideas.id(req.params.idea_id);
		idea.name = ideaEdited.name;
		idea.description = ideaEdited.description;

		category.save();

		res.redirect("/collections/" + req.params.id);
	});
});


// Delete Route
router.delete("/:id/categories/:category_id/clusters/:cluster_id/ideas/:idea_id", middleware.checkOwnership, function(req, res) {
	console.log("ROUTE DELETE")
	Category.findById(req.params.category_id, function(err, category) {
		if(err) {return console.log(err)}

		var ideasCluster = category.clusters.id(req.params.cluster_id);
		var idea = ideasCluster.ideas.id(req.params.idea_id);

		ideasCluster.ideas.pull(idea);
		category.save();

		res.redirect("/collections/" + req.params.id);
	});
});


module.exports = router;
