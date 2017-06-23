var mongoose = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
session = require("express-session"),
User = require("./models/user"),
IdeaSchema = require("./models/idea"),
Category = require("./models/category"),
Comment = require("./models/comment"),
Collection = require("./models/collection");




var data = {
	users: [
		{
			username: "Monika Markowicz",
			password: "a",
			image: "https://images.pexels.com/photos/277088/pexels-photo-277088.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
		},
		{
			username: "George Weasley",
			password: "a",
			image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
		},
		{
			username: "a",
			password: "a",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_QLfVbZ9MeaB6e5j-952DOayRKZodGAIuuCbh7_oW_4Ho082T_g"
		}
	],

	categories: [
		{
			name: "Learning",
			clusters: [
				{
					source: {
						name: "The Art of Learning by Josh Waitzkin",
						label: "Book",
						image: "http://images.gr-assets.com/books/1348688766l/857333.jpg"
					}
				},
				{
					source: {
						name: "Tim Ferriss Podcast",
						kind: "Podcast",
						image: "http://is1.mzstatic.com/image/thumb/Music127/v4/00/aa/e9/00aae9d6-1484-0d65-c70b-11132773bcae/source/600x600bb.jpg"
					}
				}
			]
		},
		{
			name: "Mindset & Psychology",
			clusters: [
				{ source: {
						name: "Tim Ferriss",
						label: "Podcast",
						image: "http://is1.mzstatic.com/image/thumb/Music127/v4/00/aa/e9/00aae9d6-1484-0d65-c70b-11132773bcae/source/600x600bb.jpg"
					}
				},
				{ source: {
						name: "Josh Waitzkin - The Art of Learning",
						label: "Book",
						image: "http://images.gr-assets.com/books/1348688766l/857333.jpg"
					}
				},
				{
					source: {
						name: "Extreme Ownership - Jocko Willink",
						label: "Book",
						image: "https://images-na.ssl-images-amazon.com/images/I/41cmM6UedGL._SX331_BO1,204,203,200_.jpg"
					}
				}
			]
		},
		{
			name: "Effectiveness",
			clusters: [
				{ source: {
						name: "Tim Ferriss",
						label: "Podcast",
						image: "http://is1.mzstatic.com/image/thumb/Music127/v4/00/aa/e9/00aae9d6-1484-0d65-c70b-11132773bcae/source/600x600bb.jpg"
					}
				}
			]
		}
	],

	ideas: [
		{
			name: "Making smaller circles",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
		},
		{
			name: "Step by step",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
		},
		{
			name: "Using adversity",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
		}
	],

	comments: [
		{
			text: "Good ideas, I guess. Seems useful.",
			author: {
				username: "Dude3456",
			  password: "a",
			  image: "http://images2.wikia.nocookie.net/bleach/es/images/thumb/6/6f/Renji123.jpg/275px-Renji123.jpg"
				}
		},
		{
			text: "Ferriss podcast? Srsly? Cmon man. Otherwise looks alright.",
			author: {
				username: "Grzegorz Wierzycki",
			  password: "a",
			  image: "http://images2.wikia.nocookie.net/bleach/es/images/thumb/6/6f/Renji123.jpg/275px-Renji123.jpg"
				}
		},
		{
			text: "Bro tim ferriss podcast is actually good, have you ever even listened to it? Sure some interviews suck, some are really so-so but some are just pure gold. How about you check your facts before talking?",
			author: {
				username: "Jason M.",
			  password: "a",
			  image: "http://images2.wikia.nocookie.net/bleach/es/images/thumb/6/6f/Renji123.jpg/275px-Renji123.jpg"
				}
		},
	]
}


var seedDB = function() {

	removeCollection(User);
	removeCollection(Comment);
	removeCollection(Collection);
	removeCollection(Category);



	data.users.forEach(function(userdata) {
		fillCollection(userdata);
	});


	function removeCollection(Name) {
			Name.remove({}, function(err) {
			});
	}

	function createCategory(categorydata) {
		var category = new Category(categorydata);
		return category;
	}

	function fillCategory(category) {
		for (var j = 0; j < data.ideas.length; j++) {
			category.clusters.forEach(function(cluster) {
				cluster.ideas.push(data.ideas[j]);
			});
		}
	}

	function save(theCollection) {
		theCollection.save(function(err, theCollection){
			if(err) {return console.log(err)}
		});
	}

	function collectionInsertCategories(collection, categorydata) {
			for (var i = 0; i < categorydata.length; i++) {
				var category = createCategory(categorydata[i])
				fillCategory(category);
				save(category);

				collection.categories.push(category);
			}
	}

	function collectionInsertComments(collection) {

			var user = data.users[0];

			for (var i = 0; i < 8; i++) {

				var comment = {
					text: "This is some great, amazing, fantastic, awesome sample comment which contains so little information that it's actually nothing, which actually is a whole lot, which means this is a random cluster of letters that doesn't mean anything but is meaningful precisely because of that because it's only purpose is to be a random cluster of letters on the screen. A truly great comment. Now how about three dots at the end...",
					author: user
				}

				collection.comments.push(comment);

			}
	}

	function saveCollection(collection) {
			collection.save(function(err, collection) {
				if(err) {return console.log(err)}
			});
	}


	function createCollection(collection) {
		Collection.create(collection, function(err, collection) {
				if (err) {return console.log(err);}

				collectionInsertCategories(collection, data.categories);
				collectionInsertComments(collection);
				save(collection);
			});
	}

	function setCollectionData(user) {
		var collection = {
			description: "Essential Ideas",
			author: {
				id: user.id,
				username: user.username,
				image: user.image
			}
		}

		return collection;
	}

	function fillCollection(userdata) {


		User.register(new User({username: userdata.username, image: userdata.image}), userdata.password, function(err, user) {
				if (err) {return console.log(err)}

			var collection = setCollectionData(user);
			createCollection(collection);

		});
	}
}

module.exports = seedDB;
