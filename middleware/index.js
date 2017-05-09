var User = require("../models/user"),
session = require("express-session"),
mongoose = require("mongoose"),
passport = require("passport"),
passportLocalMongoose = require("passport-local-mongoose");

var index = {
	isLoggedIn: function(req, res, next) {
		if (req.isAuthenticated()) {
			next();
			return;
		}
		res.redirect("/login");
	}
}

module.exports = index;
