var User = require("../models/user"),
session = require("express-session"),
mongoose = require("mongoose"),
passport = require("passport"),
passportLocalMongoose = require("passport-local-mongoose");

var index = {
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
	}

}

module.exports = index;
