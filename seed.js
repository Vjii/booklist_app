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

var data = [
	{
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb",
		description: "Ideas about learning.",
		author: {
			username: "Monica Markowicz",
			image: "https://images.pexels.com/photos/277088/pexels-photo-277088.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
		}
	},
	{
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb",
		description: "Ideas about learning.",
		author: {
			username: "George Weasley",
			image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
		}
	},
	{
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb",
		description: "Ideas about learning.",
		author: {
			username: "Au",
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_QLfVbZ9MeaB6e5j-952DOayRKZodGAIuuCbh7_oW_4Ho082T_g"
		}
	}
]

var categorydata = [
	{
		name: "Learning",
		sources: [
			{
				name: "Josh Waitzkin - The Art of Learning",
				kind: "Book",
				image: "http://images.gr-assets.com/books/1348688766l/857333.jpg"
			}
		]
	},
	{
		name: "Mindset & Psychology",
		sources: [
			{
				name: "Tim Ferriss",
				kind: "Podcast",
				image: "http://is1.mzstatic.com/image/thumb/Music127/v4/00/aa/e9/00aae9d6-1484-0d65-c70b-11132773bcae/source/600x600bb.jpg"
			},
			{
				name: "Josh Waitzkin - The Art of Learning",
				kind: "Book",
				image: "http://images.gr-assets.com/books/1348688766l/857333.jpg"
			},
			{
				name: "Extreme Ownership - Jocko Willink",
				kind: "Book",
				image: "https://images-na.ssl-images-amazon.com/images/I/41cmM6UedGL._SX331_BO1,204,203,200_.jpg"
			}
		]
	},
	{
		name: "Effectiveness",
		sources: [
			{
				name: "Tim Ferriss",
				kind: "Podcast",
				image: "http://is1.mzstatic.com/image/thumb/Music127/v4/00/aa/e9/00aae9d6-1484-0d65-c70b-11132773bcae/source/600x600bb.jpg"
			}
		]
	}
]


var ideasdata = [
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
]


var seedDB = function() {

	User.remove({}, function(err) {
	});


	Collection.remove({}, function(err) {
	});

	Category.remove({}, function(err) {
	});


	data.forEach(function(collection) {

		Collection.create(collection, function(err, collection) {
			if (err) {return console.log(err);}

			for (var i = 0; i < categorydata.length; i++) {
				var category = new Category(categorydata[i]);

				for (var j = 0; j < ideasdata.length; j++) {
					category.sources.forEach(function(source) {
						source.ideas.push(ideasdata[j]);
					})
				}

				category.save(function(err, category){
					if(err) {return console.log(err)}
				});

				collection.categories.push(category);
			}

			collection.save(function(err, collection) {
				if(err) {return console.log(err)}
			});

		});
	});

}

module.exports = seedDB;
