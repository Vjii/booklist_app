var express = require("express");
var router = express.Router(),
passport = require("passport"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
session = require("express-session"),
Collection = require("../models/collection"),
User = require("../models/user"),
Category = require("../models/category"),
Comment = require("../models/comment"),
middleware = require("../middleware/index");



// New comment route
router.get("/:id/comments/new", middleware.checkLoggedIn,  function(req, res) {
	var id = req.params.id;
	res.render("comments/new", {id: id});
});


// Create comment route
router.post("/:id/comments", middleware.checkLoggedIn, function(req, res) {

	Collection.findById(req.params.id, function(err, collection) {
		if (err) { console.log(err); }

		comment = { text: req.body.comment, author: req.user }

		collection.comments.push(comment);
		collection.save();

		res.redirect("/collections/" + req.params.id);
	})
});

// Edit comment route
router.get("/:id/comments/:comment_id/edit", middleware.checkOwnership,  function(req, res) {

})

// Update comment route
router.put("/:id/comments/:comment_id", middleware.checkOwnership, function(req, res) {

});


// Delete comment route
router.delete("/:id/comments/:comment_id", middleware.checkOwnership, function(req, res) {

});

module.exports = router;
