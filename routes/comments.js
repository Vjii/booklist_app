var express = require("express");
var router = express.Router();
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


// Create comment roue
router.post("/:id/comments",  function(req, res) {

	var id = req.params.id

	Collection.findById(id, function(err, collection) {
		if (err) {
			console.log(err)
			res.redirect("back");
		} else {
			Comment.create({text: req.body.comment}, function(err, comment) {
				if (err) {
					console.log(err);
					res.redirect("back");
				} else {

					var date = new Date();
					comment.date = date.toDateString();
					comment.author.id = req.user.id;
					comment.author.username = req.user.username;
					comment.author.image = req.user.image;
					comment.save();

					collection.comments.push(comment);
					collection.save();
					res.redirect("/collections/" + id)
				}
			})
		}
	})
});

// Edit comment route
router.get("/:id/comments/:comment_id/edit", middleware.checkOwnership,  function(req, res) {
	var id = req.params.id
	var comment_id = req.params.comment_id

	Comment.findById(comment_id, function(err, comment) {
		if (err) {
			console.log(err)
			res.redirect("back");
		} else {
			res.render("comments/edit", {comment: comment, id: id});
		}
	})
})

// Update comment route
router.put("/:id/comments/:comment_id", middleware.checkOwnership, function(req, res) {
	var id = req.params.id;
	var comment_id = req.params.comment_id;
	var text = req.body.comment;
	Comment.findByIdAndUpdate(comment_id, {text: text}, function(err, comment) {
		if (err) {
			console.log(err);
			res.redirect("/collections/" + id + "comments/" + comment_id + "/edit");
		} else {
			res.redirect("/collections/" + id);
		}
	})
});


// Delete comment route
router.delete("/:id/comments/:comment_id", middleware.checkOwnership, function(req, res) {
	var id = req.params.id;
	var comment_id = req.params.comment_id;

	Collection.findById(id, function(err) {
		if (err) {
			console.log(err);
			res.redirect("/collections/" + id);
		} else {
			Comment.findByIdAndRemove(comment_id, function(err) {
				if (err) {

				} else {
					res.redirect("/collections/" + id)
				}
			})
		}
	})
});



module.exports = router;
