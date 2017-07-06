//SETUP
var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
session = require("express-session"),
whitelist = require("walter-whitelist"),
back = require("express-back"),

// SETUP - Models
User = require("./models/user"),
IdeaSchema = require("./models/idea"),
ClusterSchema = require("./models/cluster"),
Category = require("./models/category"),
Comment = require("./models/comment"),
Collection = require("./models/collection"),
index = require("./middleware/index"),
seedDB = require("./seed");


//CONFIG
// mongoose.connect("mongodb://localhost/cerebrate");
mongoose.connect("mongodb://John:lordek@ds151082.mlab.com:51082/cerebrate");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use(session({
	secret: "Shades of grey",
	resave: false,
	saveUninitialized: false
}));
app.use(back());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	User.findById(user._id, function(err, user) {
		user.image = user.image
		done(err, user);
	});
});

passport.use(new LocalStrategy(User.authenticate()));

//LOCALS
app.use(function(req, res, next) {
	if (req.user) {
		res.locals.currentUser = req.user;
	} else {
		res.locals.currentUser = null;
	}
	next();

	if (req.session.activeCategory) {
		res.locals.activeCategory = req.session.activeCategory
	} else {
		res.locals.activeCategory = null;
	}
});

seedDB();

//REQUIRE ROUTES
var commentsRoutes = require("./routes/comments");
var usersRoutes = require("./routes/users");
var clustersRoutes = require("./routes/clusters");
var ideasRoutes = require("./routes/ideas");
var categoriesRoutes = require("./routes/categories");
var collectionsRoutes = require("./routes/collections");
var indexRoutes = require("./routes/index");

//ROUTES
app.use("/collections", ideasRoutes);
app.use("/collections", clustersRoutes);
app.use("/collections", categoriesRoutes);
app.use("/collections", collectionsRoutes);
app.use("/collections", commentsRoutes);
app.use("/", indexRoutes);
app.use("/users", usersRoutes);


app.get("/", function(req, res) {
	res.render("landing");
});


app.listen(3000, function() {
	console.log("Booklist app server listening.")
});


