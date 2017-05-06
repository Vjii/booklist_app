var express = require("express");
var router = express.Router();
Collection = require("../models/collection"),
User = require("../models/user"),
Book = require("../models/book"),
Comment = require("../models/comment");


// router.get("/:id/comments", function(req, res) {
// 	var id = req.params.id;
// 	Collection.findById(id).populate("comments").exec(function(err, collection) {
// 		if (err) {
// 			console.log(err);
// 			res.render("back");
// 		} else {
// 			res.render("show", {collection: collection});
// 		}
// 	});
// });







module.exports = router;
