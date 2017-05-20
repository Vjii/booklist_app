//SETUP
var express = require("express"),
app = module.exports = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
session = require("express-session"),
acl = require("acl"),
back = require("express-back"),
// SETUP - Models
index = require("./middleware/index"),
User = require("./models/user"),
Collection = require("./models/collection"),
Comment = require("./models/comment"),
Book = require("./models/book"),
seedDB = require("./seed");


//CONFIG
mongoose.connect("mongodb://localhost/booklist_app");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use(session({
	secret: "Non-trivially gray cat on roads of random",
	resave: false,
	saveUninitialized: false
}));
app.use(back());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//LOCALS
app.use(function(req, res, next) {
	if (req.user) {
		res.locals.currentUser = req.user;
	} else {
		res.locals.currentUser = null;
	}
	next();
});


//REQUIRE ROUTES
var collectionsRoutes = require("./routes/collections");
var booksRoutes = require("./routes/books")
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");
var ideaRoutes = require("./routes/ideas");

//ROUTES
app.use("/collections", collectionsRoutes);
app.use("/collections", booksRoutes);
app.use("/collections", commentRoutes);
app.use("/", indexRoutes);
app.use("/collections", ideaRoutes);

//SEED DATABASE
seedDB();

app.get("/", function(req, res) {
	res.render("landing");
});

app.listen(3000, function() {
	console.log("Booklist app server listening.")
});





