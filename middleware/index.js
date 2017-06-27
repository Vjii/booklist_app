var User = require("../models/user"),
session = require("express-session"),
mongoose = require("mongoose"),
passport = require("passport"),
passportLocalMongoose = require("passport-local-mongoose"),
Category = require("../models/category"),
Collection = require("../models/collection");

var middleware = {
	checkLoggedIn: function(req, res, next) {

		if (req.isAuthenticated()) {
			next();
			return;
		}
		res.redirect("/login");
	},
	alreadyLoggedIn: function(req, res, next) {
		if (req.user) {
			console.log("Flash message, add later - you're already registered/logged in!");
			res.redirect("/collections");
			return;
		}
		next();
		return;
	},
	checkOwnership: function(req, res, next) {
		if (req.user) {
			Collection.findById(req.params.id, function(err, collection) {
				if (err) {return console.log(err); }

					if (collection.author.id.equals(req.user.id)) {
						next();
						return;
					}
				console.log("Got no permission to do that.");
				res.back();
			});

		} else {
			console.log("You don't have a permission to do that.")
			res.redirect("/login");
		}
	},
	checkCategoriesLimit: function(req, res, next) {
		Collection.findById(req.params.id, function(err, collection) {
			if (collection.categories.length < 3 ) {
				next();
				return;
			}

			console.log("You already added the maximum number of 3 categories.");
			res.redirect("/collections/" + collection.id)
		});
	},
	checkClustersLimit: function(req, res, next) {
		Category.findById(req.params.category_id, function(err, category) {
			if (category.clusters.length < 3) {
				next();
				return;
			}
			console.log("You've already reached the maximum number of 3 clusters.")
		});
	},
	checkIdeasLimit: function(req, res, next) {
		Category.findById(req.params.category_id, function(err, category) {
			var ideasCluster = category.clusters.id(req.params.cluster_id);

			if (ideasCluster.ideas.length < 3) {
				next();
				return;
			}

			console.log("You've already reached the maximum number of 3 ideas.");
		});
  }
}

module.exports = middleware;
