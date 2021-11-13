var express 				= require("express"),
	app         			= express(),
	methodOverride 			= require("method-override"),
	bodyParser 				= require("body-parser"),
	expressSanitizer 		= require("express-sanitizer"),
	flash 					= require("connect-flash"),
	mongoose 				= require("mongoose"),
	passport				= require("passport"),
	LocalStrategy			= require("passport-local"),
	User                    = require("./models/user");

var commentRoutes = require("./routes/comments"),
	blogRoutes = require("./routes/blogs"),
	indexRoutes = require("./routes/index")

mongoose.connect('mongodb://localhost:27017/blogdb', 
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

// var seedDB 	= require("./seeds");


app.locals.moment = require('moment');

// seedDB();

app.use(require("express-session")({
	secret: "my name is nishant",
	resave: false,
	saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/blogs",blogRoutes);
app.use("/blogs/:id/comments",commentRoutes);


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(3000,function(){
	console.log("SERVER STARTED!!!!")
});