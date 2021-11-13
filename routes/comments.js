var express = require("express");
var router  = express.Router({mergeParams: true});
var Blog = require("../models/blogs");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get("/new",middleware.isLoggedIn,function(req,res){
	Blog.findById(req.params.id, function(err,blog){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{blog: blog});
		}
	});
});

router.post("/",middleware.isLoggedIn,function(req,res){
	Blog.findById(req.params.id, function(err, blog){
		if(err){
			console.log(err);
			res.redirect("/blogs");
		}else{
			Comment.create(req.body.comments, function(err,comment){
				if(err){
					req.flash("error","Something went wrong!");
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();

					blog.comments.push(comment);
					blog.save();
					req.flash("success","Comment added successfully!");
					res.redirect("/blogs/" + blog._id);
				}
			});
		}
	});
});

router.get("/:cid/edit",middleware.checkCommentOwnership,function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err || !foundBlog){
			req.flash("error", "No Blog Found!");
			return res.redirect("back");
		}
		Comment.findById(req.params.cid, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error","Comment not found");
				res.redirect("/");
			}else{
				res.render("comments/edit",{blog_id : req.params.id, comments:foundComment});
			}
		});
	});

});

router.put("/:cid",middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.cid, req.body.comments, function(err,updatedcomments){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("/blogs/"+req.params.id);
		}
	})
});

router.delete("/:cid",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.cid,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","comment deleted");
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

module.exports = router;