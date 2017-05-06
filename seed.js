var mongoose = require("mongoose");
var User = require("./models/user");
var Collection = require("./models/collection");
var Book = require("./models/book");
var Comment = require("./models/comment");


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
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Military and psychology books.",
		author: {username: users[0].username, image: users[0].image}},
	{
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Military and psychology books.",
		author: {username: users[1].username, image: users[1].image}},
	{
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Military and psychology books.",
		author: {username: users[2].username, image: users[2].image} }
]

var books = {
				title: "Test book title",
				image: "https://static1.squarespace.com/static/54389d3ae4b089923dc98f19/t/54830a0ce4b0e99ec57464cc/1417873932549/?format=500w",
				description: "Test book description blah blah blah something bla something ble something bleh bleh.Test book description blah blah blah something bla something ble something bleh bleh.Test book description blah blah blah something bla something ble something bleh bleh.Test book description blah blah blah something bla something ble something bleh bleh.Test book description blah blah blah something bla something ble something bleh bleh.Test book description blah blah blah something bla something ble something bleh bleh.Test book description blah blah blah something bla something ble something bleh bleh."
			}


var comments = [{
						text: "Test comment blah blah blah blah blah blah. Very awesome comment, real depth, great message, all around top quality extremely useful super mega great fantastic amazing comment.",
						author: { username: users[0].username}
						},
						{
						text: "real depth, great message.",
						author: { username: users[1].username}
						},
						{
						text: "blah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blah",
						author: { username: users[2].username}
						},
						{
						text: "Test useful super mega great fantast. Top quality extremely useful super mega great fantastic amazing comment.",
						author: { username: users[2].username}
						}
					]






function seedDB() {
	collections.forEach(function(collection) {
		Collection.create(collection, function(err, collection) {
			if (err) {
				console.log(err);
			} else {
				console.log("Collection created: " + collection.description);
				Book.create(books, function(err, books) {
					if (err) {
						console.log(err);
					} else {
						collection.books.push(books);
						collection.save(function(err, collection) {
							if (err) {
								console.log(err);
							} else {
								console.log(books + "A D D E D.");
							}
						});
					}
				});
				Book.create(books, function(err, books) {
					if (err) {
						console.log(err);
					} else {
						collection.books.push(books);
						collection.save(function(err, collection) {
							if (err) {
								console.log(err);
							} else {
								console.log(books + "A D D E D.");
							}
						});
					}
				});

				Comment.create(comments[0], comments[1], comments[2], comments[3], function(err, comment) {
					if (err) {
						console.log(err);
					} else {
						collection.comments.push(comment);
						collection.save(function(err, collection) {
							if(err){

							} else {
								console.log(collection.comments)
							}
						});
					}

				})










				// <--- Create collection/push books & comments into it --->
			}
			console.log(collection.books + "- books")
		});
	});
};

module.exports = seedDB;
