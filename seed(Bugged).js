var mongoose = require("mongoose");

var users = [
	{ username: "Az", password: "asd", image: "https://s-media-cache-ak0.pinimg.com/originals/c4/79/d4/c479d402abffd4365104f872f2aa1724.jpg" }
]

var collections = [
	{
		image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb", description: "Ideas about learning."
	},
	{
		image: "http://www.gimnasioweb.com/imagenes/entradas/rutina-arnold-2.jpg", description: "Ideas about effectiveness."
	},
	{
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwf0UIOnqfYtzHbpzKUanrKhvlMJUwO7kQIQT8p3ozvqz0z4o39Q", description: "Everything about strategy."
	}
]


// var categories = [
// 		{ name: "Learning",
// 			sources: {
// 								name: "The Art of Learning - Josh Waitzkin",
// 								kind: "Book",
// 								image: "https://www.neilstrauss.com/wp-content/uploads/The-art-of-Learning.jpg",
// 								ideas: [
// 												{
// 													name: "Making smaller circles",
// 													description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
// 												},
// 												{
// 													name: "Step by step",
// 													description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
// 												},
// 												{
// 													name: "Using adversity",
// 													description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
// 												}
// 											]
// 							}
// 			},
// 			{	name: "Discipline",
// 				sources: {
// 									name: "Extreme Ownership - Jocko Willink",
// 									kind: "Book",
// 									image: "https://www.neilstrauss.com/wp-content/uploads/The-art-of-Learning.jpg",
// 									ideas: [
// 												{
// 													name: "Making smaller circles",
// 													description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
// 												},
// 												{
// 													name: "Step by step",
// 													description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
// 												}
// 											]
// 								}
// 			},
// 			{ name: "Effectiveness",
// 				sources: {
// 									name: "Tim Ferriss",
// 									kind: "Podcast",
// 									image: "https://www.neilstrauss.com/wp-content/uploads/The-art-of-Learning.jpg",
// 									ideas: {
// 													name: "Using adversity",
// 													description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
// 												}
// 								}
// 	}
// ]


		// Category.create(
		// 	{ name: "Learning",
		// 		sources: {
		// 						name: "The Art of Learning - Josh Waitzkin",
		// 						kind: "Book",
		// 						image: "https://www.neilstrauss.com/wp-content/uploads/The-art-of-Learning.jpg",
		// 						ideas: [
		// 										{
		// 											name: "Making smaller circles",
		// 											description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
		// 										},
		// 										{
		// 											name: "Step by step",
		// 											description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
		// 										},
		// 										{
		// 											name: "Using adversity",
		// 											description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratioe ninventore ab natus, ullam sapiente placeat velit ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore odio tempore architecto ea similique obcaecati mollitia perferendis hic aspernatur fuga sed ratione inventore ab natus, ullam sapiente placeat velit ipsum."
		// 										}
		// 									]
		// 			}
		// 	}, function(err, category) {
		// 					if(err) {return console.log(err)}
		// 					collection.categories.push(category);
		// 			});




var seedDB = function() {

	User.remove({}, function(err) {
		console.log("Users removed");
	});

	Collection.remove({}, function(err) {
		console.log("Collections removed");
	});

	Category.remove({}, function(err) {
		console.log("Categories removed");
	});

	Comment.remove({}, function(err) {
		console.log("Comments removed")
	})




		Collection.create(
			{
				image: "https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?h=350&auto=compress&cs=tinysrgb",
				description: "Military and psychology books."
			},
		 function(err, collection) {
			if (err) {return console.log(err)}

			User.register(new User({username: users[0].username, image: users[0].image}), users[0].password, function(err, user) {
				if(err) {
					console.log("Error during registration process: " + err);
					return res.render("/authentication/register")
				}

				collection.author.id = user.id
				collection.author.username = user.username;
				collection.author.image = user.image;







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


			});
		});

};

module.exports = seedDB;
