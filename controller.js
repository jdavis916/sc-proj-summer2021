//this file contains stub data for pages
import User from './backend/models/user';
import CarModel from './backend/models/cars';
import RideModel from './backend/models/rides';
import ContactModel from './backend/models/contact';
var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;
var activeMenu;

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

var d = new Date(1630885183965);
var date = d.toLocaleString();
var profPic = '/img/profStub.jpg';

var map = '/img/fullMap.jpg'
//query objects
;

var payments = [{
  id: 1,
  name: 'Chase',
  accountNumber: 445564, 
  exp: 'June 2025', 
  active: true
},{
  id: 2,
  name: 'Apple Pay',
  accountNumber: 25638, 
  exp: 'Aug 2028', 
  active: false
}];



var cars = [{
  price: 45,
  year: 2020,
  make: 'Tesla',
  model: 'Model 3',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Red',
  img: '/img/civicTypeR2019.png'
},{
  price: 45,
  year: 2019,
  make: 'Tesla',
  model: 'Model S',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'White',
  img: '/img/civicTypeR2019.png'
},{
  price: 45,
  year: 2021,
  make: 'Tesla',
  model: 'Model X',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Blue',
  img: '/img/civicTypeR2019.png'
},{
  price: 45,
  year: 2021,
  make: 'Tesla',
  model: 'Model Y',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Black',
  img: '/img/civicTypeR2019.png'
},{
  price: 45,
  year: 2026,
  make: 'Toyota',
  model: 'Avalon',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Red',
  img: '/img/civicTypeR2019.png'
},{
  price: 45,
  year: 2027,
  make: 'Ford',
  model: 'Focus',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'Blue',
  img: '/img/sonic2019.png'
},{
  price: 45,
  year: 2024,
  make: 'Subaru',
  model: 'Impreza',
  type: 'Sedan',
  doors: 4,
  seats: 5,
  color: 'White',
  img: '/img/audiA42018.png'
}];

var rides = [{
  start: date,
  end: date,
  price: 35,
  car: '2024 Subaru Impreza',
  start_location: '123 W East St.'
},{
  start: date,
  end: date,
  price: 48,
  car: '2027 Ford Focus',
  start_location: '456 W North St.'
},{
  start: date,
  end: date,
  price: 28,
  car: '2024 Subaru Impreza',
  start_location: '123 W East St.'
},{
  start: date,
  end: date,
  price: 30,
  car: '2021 Tesla Model Y',
  start_location: '123 W East St.'
}];

//these objects do not query the database
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

module.exports = {
  async getPayments(req,res,next){
  let user = await db.collection('users').find(req.user._id);
  console.log(res.email);
  return user;
},
  rides,
  profPic,
  payments,
  cars,
  map,
  subjects,
};