import { profPic, payments, cars, map, subjects, getRides, getCars } from '../controller';
import { authUser, authRole, authBan } from '../basicAuth';
import User from "../backend/models/user";
import CarModel from '../backend/models/cars';
import RideModel from '../backend/models/rides';
import ContactModel from '../backend/models/contact';
import session from 'express-session';
var d = new Date(1630885183965);
var date = d.toLocaleString();
var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose').set('debug', true);
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
  console.log(activeMenu);
  //changed the proper key to true based on page route
  activeMenu[key] = true;

  return activeMenu;
}

var activeMenu = {
  home: false,
  rental: false,
  settings: false,
  profile: false,
  contact: false,
  profile: false
};
var error = false;
var details = [];
//console.log(activeMenu);
/* GET home page */
router.get('/', async function(req, res, next) {
  //console.log(req);
  //console.log(req.user);
  //console.log(req.cookies);
  //database queries will be added later
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
.get('/rental', /*authUser*/ async function(req, res, next) {
  console.log(payments);
  try{
    await getCars(req, res);
  }catch(err){
    console.log('error: ' + err);
  }
})
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
//rental form post
.post('/rentcar', function(req,res,next){
  console.log(req.body);
  details = ['Payment method: ' + req.body.payment,'Start Time: ' + req.body.startTime,
    'End Time: ' + req.body.endTime,'Pickup Location: ' + req.body.pickupLocation];
  const rental = new RideModel({
  _id: mongoose.Types.ObjectId(),
  user: req.user._id,
  start: req.body.startTime,
  end: req.body.endTime,
  //price: req.body.,
  car: req.body.car,
  start_location: req.body.pickupLocation,
  payment: req.body.payment
  });
  rental.save()
  .then(result => {   
      res.render('thankyou', {
        pageMainClass: 'thankYou',
        title: 'Thanks! Your rental has been successfully placed.',
        details: details,
        path: '/'
      });
  })
  .catch(err => {
      res.send(err);
      console.log(err);
  }); 
})
//contact post route
.post('/contact', function(req,res,next){
  console.log(req.body);
  const contactMsg = new ContactModel({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    subject: req.body.subject,
    phone: req.body.phone,
    email: req.body.email,
    msg: req.body.msg,
    date: date
  });
  contactMsg.save()
  .then(result => {   
      res.render('thankyou', {
        pageMainClass: 'thankYou',
        title: 'Thank your for your feedback. We will reach out to you as soon as we can.',
        path: '/'
      });
  })
  .catch(err => {
      res.send(err);
      console.log(err);
  });
  
})
//this was purely to get info into the database. not an actual route
.post('/cars', function(req,res,next){
  const car = new CarModel({
    _id: req.body.id,
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    type: req.body.type,
    doors: req.body.doors,
    seats: req.body.seats,
    color: req.body.color,
    price: req.body.price,
    img: req.body.img,
  });
  car.save()
  .then(result =>{
    console.log(res.body);
    res.send('car(s) saved.');
  })
  .catch(err =>{
    res.send(err);
    console.log(err);
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