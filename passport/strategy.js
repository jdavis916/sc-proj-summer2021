var express = require('express');
const userModel = require('../backend/models/user')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var db = mongoose.connection;
//var signInError = false;
//stores a token for the session in the browser cookie
passport.serializeUser((user, done)=>{
	done(null, user.id);
});
//takes a token from the cookie and converts it to user id
passport.deserializeUser((id, done)=>{
	userModel.findById(id, (err, user)=> {
		done(err, user);
	});
});
//strategy for passport to handle sign in validation
passport.use(
	new LocalStrategy(
  	function(req, username, pw, done) {
//finds a user by the info entered in. returns an error if user isn't found
  	  userModel.findOne({ username: username }, function (err, user) {
  	    if (err) { return done(err);}
  	    if (!user) { return done(null, false);}
  	    if (!user.verifyPassword(pw)) { return done(null, false); }
  	    return done(null, user);
  	  });
  	}
	));
	//.save()
	/* .then(user => {
		return done(null, user)
	})
	.catch(err => {
		return done(null, false, { message: err });
}); */

module.exports = passport;