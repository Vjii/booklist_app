var express = require("express"),
router = express.Router(),
passport = require("passport"),
Collection = require("../models/collection"),
User = require("../models/user"),
Book = require("../models/book");


router.get("/register", function(req, res) {
	res.render("authentication/register");
})

router.post("/register", function(req, res, next) {

	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			console.log("Error during registration process: " + err);
			return next(err);
		}
			console.log("User registered!");
			res.redirect("/collections");
	});
});


router.get("/login", function(req, res) {
	res.render("authentication/login");
});

router.post('/login', passport.authenticate('local',
	{ successRedirect: '/collections',
    failureRedirect: '/login' })
);


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



module.exports = router;


