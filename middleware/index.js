var User = require("../models/user"),
session = require("express-session"),
mongoose = require("mongoose"),
passport = require("passport"),
passportLocalMongoose = require("passport-local-mongoose");

var index = {
	isLoggedIn: function(req, res, next) {
		next();
		return;
		// if (req.isAuthenticated()) {
		// 	console.log("Already logged in - add flash message");
		// 	next();
		// 	return;
		// }
		// res.redirect("/login");
	},
	checkLoggedIn: function(req, res, next) {
		if (req.user) {
			console.log("Flash message, add later - you're already registered/logged in!");
			res.redirect("/collections");
			return;
		}
		next();
		return;
	}
}

module.exports = index;
