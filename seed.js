var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var Collection = require("./models/collection");
var Book = require("./models/book");
var Comment = require("./models/comment");


User.remove({}, function(err) {
	if(err) {
		console.log(err);
	} else {
		console.log("Collections removed");
	}
});

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
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Military and psychology books."
	},
	{
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Military and psychology books."
	},
	{
		image: "https://images-na.ssl-images-amazon.com/images/I/51aicxKv7cL._SY344_BO1,204,203,200_.jpg", description: "Military and psychology books."
	}
]

var book1 = {
				title: "Test book title",
				image: "https://img1.od-cdn.com/ImageType-400/1493-1/0F9/331/A5/%7B0F9331A5-1584-40D8-B8F4-0967CDFD89D3%7DImg400.jpg",
				ideas: [
						{
						name: "Depth over breadth", description: "Depth beats breadth any day of the week. Lorem ipsum dolor sit amet, no erant nonumy euismod mea, mei ut justo quaeque consulatu. At erant labore has. Mollis postulant vix in, porro simul qui eu, est te apeirian maluisset gloriatur. Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix in, porro simul qui eu, est te apeirian maluisset gloriatur. Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est."
						},
						{
						name: "Making smaller circles", description: "By consistent repetitions aimed at compression ollis postulant vix in, porro simul qui eu, est te apeirian maluisset gloriatur. Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian maluisset gloriatur. Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix in.Test book description blah blah blah something bla something ble something bleh bleh."
						},
						{
						name: "Losing to win", description: "Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian "
						},
						{
						name: "Fantastic idea", description: "Test book description Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian "
						}
					]
			}


var book2 = {
				title: "Test book title",
				image: "https://img1.od-cdn.com/ImageType-400/1493-1/0F9/331/A5/%7B0F9331A5-1584-40D8-B8F4-0967CDFD89D3%7DImg400.jpg",
				ideas: [
						{
						name: "Depth over breadth", description: "Depth beats breadth any day of the week. Lorem ipsum dolor sit amet, no erant nonumy euismod mea, mei ut justo quaeque consulatu. At erant labore has. Mollis postulant vix in, porro simul qui eu, est te apeirian maluisset gloriatur. Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix in, porro simul qui eu, est te apeirian maluisset gloriatur. Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est."
						},
						{
						name: "Making smaller circles", description: "By consistent repetitions aimed at compression ollis postulant vix in, porro simul qui eu, est te apeirian maluisset gloriatur. Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian maluisset gloriatur. Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix in.Test book description blah blah blah something bla something ble something bleh bleh."
						},
						{
						name: "Losing to win", description: "Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian "
						},
						{
						name: "Fantastic idea", description: "Test book description Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian Option laboramus nam cu, nec ei utinam iudicabit repudiandae, et eruditi splendide democritum est.Mollis postulant vix inollis postulant vix in, porro simul qui eu, est te apeirian "
						}
					]
			}


var comments = [{
						text: "Test comment blah blah blah blah blah blah. Very awesome comment, real depth, great message, all around top quality extremely useful super mega great fantastic amazing comment.",
						author: { username: users[0].username, image: users[0].image}
						},
						{
						text: "real depth, great message.",
						author: { username: users[1].username, image: users[1].image}
						},
						{
						text: "blah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blahblah blah blah blah blah blah",
						author: { username: users[2].username, image: users[2].image}
						},
						{
						text: "Test useful super mega great fantast. Top quality extremely useful super mega great fantastic amazing comment.",
						author: { username: users[2].username, image: users[2].image}
						}
					]




var  y = 0


function seedDB() {
	collections.forEach(function(collection) {
		User.register(users[0], users[0].password, function(err, user) {
			if(err){
				return err;
			}

			Collection.create(collection, function(err, collection) {
				if (err) {
					console.log(err);
				} else {

					collection.author.id = user.id
					collection.author.username = user.username;
					collection.author.image = user.image;

					// Book.model.create(book1, function(err, books) {
					// 	if (err) {
					// 		console.log(err);
					// 	} else {
					// 		collection.books.push(books);
					// 		collection.save(function(err, collection) {
					// 			if (err) {
					// 				console.log(err);
					// 			} else {

					// 			}
					// 		});
					// 	}
					// });

					// Book.model.create(book2, function(err, books) {
					// 	if (err) {
					// 		console.log(err);
					// 	} else {
					// 		collection.books.push(books);
					// 		collection.save(function(err, collection) {
					// 			if (err) {
					// 				console.log(err);
					// 			} else {
					// 			}
					// 		});
					// 	}
					// });

					comments.forEach(function(comment) {

						Comment.create(comment, function(err, comment) {
							if (err) {

							} else {
								y ++;
								comment.text = comment.text + " NUMBER: " + y;
								comment.save();
								collection.comments.push(comment);
								collection.save();
							}
						})
					});

				}
			}); // <--- Create collection/push books & comments into it --->
		});// User.register
	});
};

module.exports = seedDB;
