var mongoose = require("mongoose");
var User = require("./models/user");
var Collection = require("./models/collection")


Collection.remove({}, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("Collections removed");
	}
});

var users = [
	{username: "Grażyna Dyskieta", password: "asd", image: "https://images.pexels.com/photos/51969/model-female-girl-beautiful-51969.jpeg?h=350&auto=compress&cs=tinysrgb"},
	{username: "Arkadiusz Sucharowicz", password: "asd", image: "https://images.pexels.com/photos/230621/pexels-photo-230621.jpeg?h=350&auto=compress&cs=tinysrgb"},
	{username: "Artur Memowicz", password: "asd", image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb"}
]

var collections = [
	{
		books: [{
			title: "Test book title",
			image: "https://static1.squarespace.com/static/54389d3ae4b089923dc98f19/t/54830a0ce4b0e99ec57464cc/1417873932549/?format=500w",
			description: "Test book description blah blah blah."}],
		image: "https://images.pexels.com/photos/51969/model-female-girl-beautiful-51969.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Books about self improvement",
		author: {username: users[0].username, image: users[0].image}},
	{
		books: [{title: "Test book title",
			image: "https://static1.squarespace.com/static/54389d3ae4b089923dc98f19/t/54830a0ce4b0e99ec57464cc/1417873932549/?format=500w",
			description: "Test book description blah blah blah."}],
		image: "https://images.pexels.com/photos/230621/pexels-photo-230621.jpeg?h=350&auto=compress&cs=tinysrgb",
		author: {username: users[1].username, image: users[1].image}},
	{
		books: [{
			title: "Test book title",
			image: "https://static1.squarespace.com/static/54389d3ae4b089923dc98f19/t/54830a0ce4b0e99ec57464cc/1417873932549/?format=500w",
			description: "Test book description blah blah blah."},
			{
			title: "Test book title",
			image: "https://static1.squarespace.com/static/54389d3ae4b089923dc98f19/t/54830a0ce4b0e99ec57464cc/1417873932549/?format=500w",
			description: "Test book description blah blah blah."},
			{
			title: "Test book title",
			image: "https://static1.squarespace.com/static/54389d3ae4b089923dc98f19/t/54830a0ce4b0e99ec57464cc/1417873932549/?format=500w",
			description: "Test book description blah blah blah."}],
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Military and psychology books.",
		author: {username: users[2].username, image: users[2].image} }
]


function seedDB() {

	collections.forEach(function(collection) {
		Collection.create(collection, function(err, collection) {
			if (err) {
				console.log(err);
			} else {
				console.log("Collection created: " + collection.description);
			}
		});
	});
};

module.exports = seedDB;
