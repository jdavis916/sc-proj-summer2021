//this file contains stub data for pages
import User from './backend/models/user';
import CarModel from './backend/models/cars';
import RideModel from './backend/models/rides';
import ContactModel from './backend/models/contact';
var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose').set('debug', true);;
var db = mongoose.connection;
var activeMenu;
const {body, validationResult } = require('express-validator');

//validator middlewares
var sanitizeArr = [
    body('name').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('email').isEmail().normalizeEmail([{gmail_remove_dots: true}]).trim(),
    //body('phone').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('subject').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('msg').matches(/^[a-zA-Z0-9 ]*$/).trim(),
    body('address').matches(/^[a-zA-Z0-9 .]*$/).trim()
];
//gets login status
function loginStatus(req){
  return (req.user)? true: false;
}
//gets user's first name
function whoIs(req){
  return (req.user) ? (req.user.f_name) : undefined;
}
//adds active class to whatever menu item corresponds to the current page
function getMenuActive(key, menu){
  //makes a copy of the menu object
  var activeMenu = JSON.parse(JSON.stringify(menu));
  // var activeMenu = menu;
  console.log(activeMenu);
  //changed the proper key to true based on page route
  activeMenu[key] = true;

  return activeMenu;
}
//menu items from navbar set to false by default
var activeMenu = {
  home: false,
  rental: false,
  settings: false,
  profile: false,
  contact: false,
  profile: false
};
function parseDate(){
  var d = new Date(1630885183965);
  var date = d.toLocaleString();
  return date;
}

var profPic = '/img/profStub.jpg';
var map = '/img/fullMap.jpg';
var payments = [{
  name: 'Chase',
  accountNumber: 1275567,
  exp: 'July 2027'
},{
  name: 'Financial Plus',
  accountNumber: 98789,
  exp: 'Aug 2024'
},{
  name: 'Apple Pay',
  accountNumber: 74563,
  exp: 'Sept 2029'
},{
  name: 'Google',
  accountNumber: 982134,
  exp: 'Jan 2025'
}];
var cars;
var rides;
var subjects = [
  'Ride Feedback',
  'Site Performance',
  'Payment Options',
  'Profile Issues',
  'Report a Car/Car Owner',
  'Other'
];
var avatar = [{
  path: '/img/man'
}, {
  path: '/img/man1'
}, {
  path: '/img/woman'
}];

//query objects-------

//User Info
async function getUser(req, res){ 
  let id = req.user.id.toString();
   //queries DB for profile matching your user id 
   //converts the results to a JSON object for handlebars 
   let me = User.find({ _id: id }).lean().then((resp)=>{
    try{
      console.log(resp);
      return resp;
    }catch(err){
      console.log('error: ' + err);
    }  
  });
}

//Cars
async function getCars(req,res){
  cars = CarModel.find().lean().then((resp)=>{
    try{
        res.render('rental', { 
        title: 'Rent a Car',
        msg: 'Choose from our selection',
        pageMainClass: 'rental',
        loggedIn: loginStatus(req),
        who: whoIs(req),
        map: map,
        cars: resp,
        payments: payments,
        active: getMenuActive('rental', activeMenu),
        profPic: profPic
      });
    }catch(err){
      console.log('error: ' + err);
    }
  })
}

//Rides
async function getRides(req, res){ 
  let id = req.user.id.toString();
   //queries DB for rides matching your user id, then 
   //converts the results to a JSON object for handlebars 
   rides = RideModel.find({ user: id }).lean().then((resp)=>{
    try{
      res.render('profile', { 
        title: 'Profile',
        msg: req.user.f_name + "'s Profile",
        pageMainClass: 'profile',
        loggedIn: loginStatus(req),
        who: whoIs(req),
        active: getMenuActive('profile', activeMenu),
        fname:req.user.f_name,
        lname:req.user.l_name,
        email: req.user.email,
        username: req.user.username,
        phone:req.user.phone,
        address:req.user.address,
        profPic: profPic,
        rides: resp
      });
      console.log(resp);
    }catch(err){
      console.log('error: ' + err);
    }  
  });
}


module.exports = {
  sanitizeArr,
  getUser,
  parseDate,
  loginStatus,
  whoIs,
  getMenuActive,
  activeMenu,
  getCars,
  getRides,
  rides,
  profPic,
  payments,
  cars,
  map,
  subjects,
};