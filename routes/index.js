import { profPic, payments, cars, map, subjects } from '../stubs';
import { authUser, authRole, authBan } from '../basicAuth';
import User from "../backend/models/user";
var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;
var activeMenu;
//logged in variable
function loginStatus(req){
  return (req.user)? true: false;
}

//gets the users first name
function whoIs(req){
  return (req.user) ? (req.user.f_name) : undefined;
}

function getMenuActive(key, menu){
  //makes a copy of the menu object
  var activeMenu = JSON.parse(JSON.stringify(menu));
  // var activeMenu = menu;

  //changed the proper key to true based on page route
  activeMenu[key] = true;

  return activeMenu;
}

var activeMenu = {
  home: false,
  rental: false,
  settings: false,
  profile: false,
  contact: false
};
var error = false;
var details = [];
/* GET home page */
router.get('/', function(req, res, next) {
  //database queries will be added later
  res.render('index', { 
  	title: 'Autono',
  	msg: 'Making the future of driving an option for anyone, anywhere, any weather.',
  	pageMainClass: 'pgHome',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    active: getMenuActive('home', activeMenu)
  });
})
.get('/contact', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact Us',
    msg: 'Send us a message.',
    pageMainClass: 'contact',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    active: getMenuActive('contact', activeMenu),
    subjects: subjects
  });
})
.get('/rental', /*authUser*/ function(req, res, next) {
  console.log(payments);
  res.render('rental', { 
    title: 'Rent a Car',
    msg: 'Choose from our selection',
    pageMainClass: 'rental',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    map: map,
    cars: cars,
    payments: payments,
    active: getMenuActive('rental', activeMenu)
  });
})
.get('/profile', /*authUser*/ function(req, res, next) {
  res.render('profile', { 
    title: 'Profile',
    msg: req.user.f_name + "'s Profile",
    pageMainClass: 'profile',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    active: getMenuActive('payment', activeMenu),
    fname:req.user.f_name,
    lname:req.user.l_name,
    email:req.user.email,
    username: req.user.username,
    phone:req.user.phone,
    address:req.user.address,
    profPic:profPic
  });
})
.get('/list', /*authUser*/ function(req, res, next) {
  res.render('list', { 
    title: 'List Your Car',
    msg: 'Let someone drive your car',
    pageMainClass: 'list',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    //active: getMenuActive('list', activeMenu)
  });
})
.get('/signup', /*authUser*/ function(req, res, next) {
  res.render('signup', { 
    title: 'Signup',
    msg: 'Its free',
    pageMainClass: 'signup',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    //error: signInError
    //active: getMenuActive('list', activeMenu)
  });
})
.get('/login', /*authUser*/ function(req, res, next) {
  //console.log(signinError);
  res.render('login', { 
    title: 'Log in',
    msg: 'Log in',
    pageMainClass: 'login',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    //error: signInError
    //active: getMenuActive('list', activeMenu)
  });
})
//rental form post
.post('/rentcar', function(req,res,next){
  console.log(req.body);
  details = ['Payment method: ' + req.body.payment,'Start Time: ' + req.body.startTime,
    'End Time: ' + req.body.endTime,'Pickup Location: ' + req.body.pickupLocation];
  res.render('thankyou', {
    pageMainClass: 'thankYou',
    title: 'Thanks! Your rental has been successfully placed.',
    details: details,
    path: '/'
  })
})
//contact post route
.post('/contact', function(req,res,next){
  console.log(req.body);
  res.render('thankyou', {
    pageMainClass: 'thankYou',
    title: 'Thank your for your feedback. We will reach out to you as soon as we can.',
    path: '/'
  })
})

// //testing thank you page 
// .get('/thankyou', function(req,res,next){
//   res.render('thankyou', {
//     pageMainClass: 'thankYou',
//     title: 'Thanks! Your rental has been successfully placed.',
//     path: '/rental'
//   })
// })
module.exports = router;