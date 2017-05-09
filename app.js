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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//REQUIRE ROUTES
var collectionsRoutes = require("./routes/collections");
var booksRoutes = require("./routes/books")
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

//ROUTES
app.use("/collections", collectionsRoutes);
app.use("/collections", booksRoutes);
app.use("/collections", commentRoutes);
app.use("/", indexRoutes);

//SEED DATABASE
seedDB();

app.get("/", function(req, res) {
	res.render("landing");
});

app.listen(3000, function() {
	console.log("Booklist app server listening.")
});





