var express = require("express");
var router  = express.Router();
var Blog = require("../models/blogs");
var middleware = require("../middleware");

router.get("/", function(req,res){
	Blog.find({},function(err,allBlogs){
		if(err){
			console.log("Error!");
		}else{
			res.render("blog/index",{blogs: allBlogs});
		}
	});
});

router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("blog/new");
});

router.post("/",middleware.isLoggedIn,function(req,res){
	var formBlog = req.body.blog; 
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(formBlog,function(err,newBlog){
		if(err){
			res.render("blog/new");
		}else{
				newBlog.author.id = req.user._id;
				newBlog.author.username = req.user.username;
				newBlog.save();

			console.log(newBlog);
			res.redirect("/blogs");
		}
	});
});

router.get("/:id",function(req,res){
	Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
		if(err || !foundBlog){
			req.flash("error","Blog not found");
			res.redirect("/blogs");
		}else{


			res.render("blog/show", {blog: foundBlog});
		}
	});
})

router.get("/:id/edit",middleware.checkBlogOwnership,function(req,res){

		Blog.findById(req.params.id,function(err, foundBlog){
			if(err){
				req.flash("error","You are not allowed to do that");
				res.redirect("back");
			}else{
				res.render("blog/edit",{blog:foundBlog});	
			}
		});
});

router.put("/:id",middleware.checkBlogOwnership, function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err,updatedBlog){
		if(err){
			console.log(err);
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/"+req.params.id);
		}
	})
});

router.delete("/:id", middleware.checkBlogOwnership, function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect("/blogs");
		}
	});
});

module.exports = router;
