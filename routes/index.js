var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/",function(req,res){
	res.render("landing");
});
router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to BlogApp " + user.username);
			res.redirect("/blogs");
		});
	});
});


router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login", passport.authenticate("local",{
	successRedirect:"/blogs",
	failureRedirect:"/login"
}),function(req,res){

});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success", "successfully, logged you out!!");
	res.redirect("/");
});


module.exports = router;