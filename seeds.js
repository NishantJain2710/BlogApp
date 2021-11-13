var mongoose = require("mongoose");
var Blog = require("./models/blogs");
var Comment  = require("./models/comment");

var data= [
	{
		title: "First" ,
		image: "http://scipy-lectures.org/_images/face.png" ,
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue eleifend nisi nec aliquet. Nullam ac dui ut odio varius vehicula vitae ut diam. Maecenas nec urna velit. Pellentesque finibus ultrices dui et aliquam. Praesent sit amet eros quam. Pellentesque sapien sem, tincidunt id magna vel, pulvinar efficitur est." ,
		Created:"july 10, 2020"
	},
	{
		title: "Second" ,
		image: "https://media.vanityfair.com/photos/5d3b1e3c5989820008deb9eb/master/w_1024%2Cc_limit/00-lead-brandy.jpg" ,
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue eleifend nisi nec aliquet. Nullam ac dui ut odio varius vehicula vitae ut diam. Maecenas nec urna velit. Pellentesque finibus ultrices dui et aliquam. Praesent sit amet eros quam. Pellentesque sapien sem, tincidunt id magna vel, pulvinar efficitur est." ,
		Created:"july 10, 2020"
	},
	{
		title: "Third" ,
		image: "https://media.vanityfair.com/photos/5d3b1e3c5989820008deb9eb/master/w_1024%2Cc_limit/00-lead-brandy.jpg" ,
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue eleifend nisi nec aliquet. Nullam ac dui ut odio varius vehicula vitae ut diam. Maecenas nec urna velit. Pellentesque finibus ultrices dui et aliquam. Praesent sit amet eros quam. Pellentesque sapien sem, tincidunt id magna vel, pulvinar efficitur est." ,
		Created:"july 10, 2020"
	}
];


function seedDB(){


	Blog.deleteMany({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("all blogs removed");
			Comment.deleteMany({},function(err){
				if(err){
					console.log(err);
				}else{
					console.log("all comments deleted");
					
				}
			data.forEach(function(seed){
				Blog.create(seed,function(err,blog){
					if(err){
						console.log(err);
					}else{
						console.log("new blog created");
						Comment.create({
							commentTitle: "comment",
							author: "Nishant"
							},function(err,cmt){
								if(err){
									console.log(err);
									console.log("err comment");
								}else{
    								blog.comments.push(cmt);
									blog.save();
									console.log("comment created");
								}
							});
					}
				});	
		   	});
		});
	}
	});	
}

module.exports = seedDB;