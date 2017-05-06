//SETUP
var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
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

//REQUIRE ROUTES
var collectionsRoutes = require("./routes/collections");
var booksRoutes = require("./routes/books")
var commentRoutes = require("./routes/comments");

//ROUTES
app.use("/collections", collectionsRoutes);
app.use("/collections", booksRoutes);
app.use("/collections", commentRoutes)

//SEED DATABASE
seedDB();

app.get("/", function(req, res) {
	res.render("landing");
});

app.listen(3000, function() {
	console.log("Booklist app server listening.")
});





