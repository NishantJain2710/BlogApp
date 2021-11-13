var Blog = require("../models/blogs");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){

		Comment.findById(req.params.cid,function(err, foundComment){
			if(err || !foundComment){
				req.flash("error","Comment not found");
				res.redirect("back");
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You are not allowed to do that");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","you need to be logged in to do that");
		res.redirect("back");
	}	
}


middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be login to do that.");
	res.redirect("/login");
}



middlewareObj.checkBlogOwnership = function(req,res,next){
	if(req.isAuthenticated()){

		Blog.findById(req.params.id,function(err, foundBlog){
			if(err || !foundBlog){
				req.flash("error","Blog not found");
				res.redirect("back");
			}else{
				if(foundBlog.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You do not have permission to do that.");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to be logged in to do that.");
		res.redirect("back");
	}	
}

module.exports = middlewareObj