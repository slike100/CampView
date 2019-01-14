var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    flash          = require("connect-flash"),
    LocalStrategy  = require("passport-local"),
    Campground     = require("./models/campground"),
    methodOverride = require("method-override"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");
    
//Requiring Routes    
var commentsRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes       = require("./routes/auth");
    

// mongoose.connect('mongodb://localhost:27017/yelp_camp_v2', { useNewUrlParser: true });

mongoose.connect('mongodb://Sam:Pin1512kys@ds035663.mlab.com:35663/yelp_camp', { useNewUrlParser: true });

mongodb://Sam:Pin1512kys>@ds035663.mlab.com:35663/yelp_camp
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

mongoose.set("useFindAndModify", false);

//seed the database
// seedDB();



// PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Maggie is the best dog in the world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
    
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
    
    
//Routes
app.use("/", authRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("YelpCamp Server has Started");
});