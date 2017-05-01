//SETUP
var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
User = require("./models/user"),
Collection = require("./models/collection"),
seedDB = require("./seed");




//CONFIG
mongoose.connect("mongodb://localhost/booklist_app");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//SEED DATABASE
seedDB();


//REQUIRE ROUTES
var collectionsRoutes = require("./routes/collections");
var booksRoutes = require("./routes/books")


//ROUTES
app.use("/collections", collectionsRoutes);
app.use("/collections", booksRoutes);



app.get("/", function(req, res) {
	res.render("landing");
});

app.listen(3000, function() {
	console.log("Booklist app server listening.")
});





