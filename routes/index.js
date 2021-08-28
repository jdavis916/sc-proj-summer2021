var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;
/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Autono',
  	msg: 'Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.',
  	pageMainClass: 'pgHome'
  });
})
.get('/contact', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact Us',
    msg: 'Send us a message.',
    pageMainClass: 'contact'
  });
})
.get('/rental', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact Us',
    msg: 'Send us a message.',
    pageMainClass: 'contact'
  });
})
.get('/profile', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact Us',
    msg: 'Send us a message.',
    pageMainClass: 'contact'
  });
})
.get('/list', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact Us',
    msg: 'Send us a message.',
    pageMainClass: 'contact'
  });
})
module.exports = router;






/*
- home, get
  - cars, get
  -users, get
-contact, get
  - /thankYou, post
  - /subjects, get : content of dropdowns
-rental, get
  -map, get
  -available cars, get
  -/rental, post
-profile, get
  -rides, get
  -user info, get
-payment, get
  -ride history, get
  -user info, get
  -rides, get (using uid)
  -stripe api for payment, get
-settings, get
  -user, get
  -cars, get (using uid)
  -user, post
  -cars, post/put   
-list your car, get
  -cars, get
  -cars, post (using uid)

*/