var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var Collection = require("./models/collection");
var Book = require("./models/book");
var Comment = require("./models/comment");
var Idea = require("./models/idea");


var users = [
	{username: "Arukhi Sahuu", password: "asd", image: "https://s-media-cache-ak0.pinimg.com/originals/c4/79/d4/c479d402abffd4365104f872f2aa1724.jpg"}
]

var collections = [
	{
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Military and psychology books."
	}
]

var books = [
	{
		title: "The Art of Learning - Josh Waitzkin",
		image: "https://www.neilstrauss.com/wp-content/uploads/The-art-of-Learning.jpg",
		ideas: [
			{
				name: "Making smaller circles",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			},
			{
				name: "Using adversity",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			},
			{
				name: "Step by step",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			}
		],
	},

	{
		title: "Extreme ownership - Jocko Willink",
		image: "https://images-na.ssl-images-amazon.com/images/I/41cmM6UedGL._SX331_BO1,204,203,200_.jpg",
		ideas: [
			{
				name: "Discipline equals freedom",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			},
			{
				name: "4:30 AM",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			},
			{
				name: "Relax. Look around. Make a call.",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			}
		],
	},

	{
		title: "Extreme ownership - Jocko Willink",
		image: "https://images-na.ssl-images-amazon.com/images/I/41cmM6UedGL._SX331_BO1,204,203,200_.jpg",
		ideas: [
			{
				name: "Discipline equals freedom",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			},
			{
				name: "4:30 AM",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			},
			{
				name: "Relax. Look around. Make a call.",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
			}
		],
	}
]


function seedDB() {

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

	Book.model.remove({}, function(err) {
		if(err) {return err};

	})

	Idea.model.remove({}, function(err) {
		if(err) {return err};
	});

	Comment.remove({}, function(err) {
		if (err) {return err};
	})







		Collection.create(collections[0], function(err, collection) {
			if (err) {
				return console.log(err);
			}

			User.register(new User({username: users[0].username, image: users[0].image}), users[0].password, function(err, user) {
				if(err) {
					console.log("Error during registration process: " + err);
					return res.render("/authentication/register")
				}
					console.log("User registered: " + user);

				collection.author.id = user.id
				collection.author.username = user.username;
				collection.author.image = user.image;
				collection.save();

				Comment.create(
						{text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", author: user
						},
						function(err, comment) {
							if (err) {return err};
							collection.comments.push(comment);
							collection.save();
					});

				Comment.create(
				{text: "Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.", author: user
				},
				function(err, comment) {
					if (err) {return err};
					collection.comments.push(comment);
					collection.save();
				});

				Book.model.create(books[0], function(err, book) {
					if (err) {return console.log(err)}
					collection.books.push(book);
					collection.save();
					console.log("BOOKS DURING CREATION: " + collection.books)


				});


				Book.model.create(books[1], function(err, book) {
					if (err) {return console.log(err)}
					collection.books.push(book);
					collection.save();
					console.log("BOOKS DURING CREATION: " + collection.books)
				});

				Book.model.create(books[2], function(err, book) {
					if (err) {return console.log(err)}
					collection.books.push(book);
					collection.save();
					console.log("BOOKS DURING CREATION: " + collection.books)
				});


			});
		});

};

module.exports = seedDB;
