var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./backend/models/user');

//authenticates requests based on strategy specified (here it's 'LocalStrategy')
passport.use(new LocalStrategy(User.authenticate()));
//creates a token and stores it in the browser cookie
passport.serializeUser(User.serializeUser());
//converts cookie token into client id
passport.deserializeUser(User.deserializeUser());
