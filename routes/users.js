var express = require("express"),
router = express.Router(),
User = require("../models/user");

// Show route
router.get("/:user_id", function(req, res) {
	var user_id = req.params.user_id;

	User.findById(user_id, function(err, user) {
		if (err) {return console.log(err); }

		res.render("users/show", {user: user});
	});
});

module.exports = router;
