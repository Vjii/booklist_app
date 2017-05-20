var express = require("express"),
router = express.Router(),
passport = require("passport"),
Collection = require("../models/collection"),
User = require("../models/user"),
Book = require("../models/book"),
index = require("../middleware/index");



router.get("/register", index.alreadyLoggedIn, function(req, res) {
	res.render("authentication/register");
})

router.post("/register", index.alreadyLoggedIn,  function(req, res) {

	User.register(new User({username: req.body.username, image: req.body.image}), req.body.password, function(err, user) {
		if(err) {
			console.log("Error during registration process: " + err);
			return res.render("/authentication/register")
		}
			console.log("User registered: " + user)

			passport.authenticate('local')(req, res, function() {
				res.redirect("/collections");
			});

	});
});


router.get("/login", index.alreadyLoggedIn, function(req, res) {
	res.render("authentication/login");
});

router.post('/login', index.alreadyLoggedIn, passport.authenticate('local',
	{ successRedirect: '/collections',
    failureRedirect: '/login' })
);


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;


