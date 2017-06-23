var express = require("express"),
router = express.Router(),
passport = require("passport"),
Collection = require("../models/collection"),
User = require("../models/user"),
Category = require("../models/category"),
middleware = require("../middleware/index");



router.get("/register", middleware.alreadyLoggedIn, function(req, res) {
	res.render("authentication/register");
})

router.post("/register", middleware.alreadyLoggedIn,  function(req, res) {

	User.register(new User({username: req.body.username, image: req.body.image}), req.body.password, function(err, user) {
		if(err) {
			console.log("Add flash message for registration error");
			return res.render("authentication/register");
		}

			console.log("User registered");

			passport.authenticate('local')(req, res, function() {
				res.redirect("/collections");
			});

	});
});


router.get("/login", middleware.alreadyLoggedIn, function(req, res) {
	res.render("authentication/login");
});

router.post('/login', middleware.alreadyLoggedIn, passport.authenticate('local',
	{ successRedirect: '/collections',
    failureRedirect: '/login' })
);


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;


