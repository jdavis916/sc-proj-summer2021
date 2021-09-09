//pulling in data from the controller
import { 
  parseDate,
  profPic, 
  payments, 
  cars, 
  map, 
  subjects, 
  getRides, 
  getCars,
  getUser, 
  loginStatus,
  whoIs,
  getMenuActive,
  activeMenu 
} from '../controller';

//control access to pages based on user role
import { authUser, authRole, authBan } from '../basicAuth'; 

//database models
import User from "../backend/models/user";
import CarModel from '../backend/models/cars';
import RideModel from '../backend/models/rides';
import ContactModel from '../backend/models/contact';
import session from 'express-session';

var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose').set('debug', true);
var db = mongoose.connection;
var error = false;
var details = [];

/* GET home page */
router.get('/', async function(req, res, next) {
  res.render('index', { 
  	title: 'Autono',
  	msg: 'Making the future of driving an option for anyone, anywhere, any weather.',
  	pageMainClass: 'pgHome',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    active: getMenuActive('home', activeMenu),
    profPic: profPic
  });
})
//get contact page
.get('/contact', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact Us',
    msg: 'Send us a message.',
    pageMainClass: 'contact',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    active: getMenuActive('contact', activeMenu),
    subjects: subjects,
    profPic: profPic
  });
})
//calls the getCars function from the controller file that renders the information on the page
.get('/rental', /*authUser*/ async function(req, res, next) {
  console.log(payments);
  try{
    await getCars(req, res);
  }catch(err){
    console.log('error: ' + err);
  }
})
//calls the getRides function from the controller file that renders the information on the page
.get('/profile', /*authUser*/ async function(req, res, next) {
  try{
    await getRides(req, res);
  }catch(err){
    console.log('error: ' + err);
  }
})
.get('/list', /*authUser*/ function(req, res, next) {
  res.render('list', { 
    title: 'List Your Car',
    msg: 'Let someone drive your car',
    pageMainClass: 'list',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    profPic: profPic
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
    profPic: profPic
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
    profPic: profPic
    //error: signInError
    //active: getMenuActive('list', activeMenu)
  });
})

module.exports = router;