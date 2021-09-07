var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;
//import {loginStatus,whoIs} from './index';
//logged in variable
import { profPic, payments, cars, map } from '../stubs';
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

router
.get('/', function(req, res, next) {
  res.render('settings', { 
    title: 'Settings',
    msg: 'Change your settings',
    pageMainClass: 'settings',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    fname:'Joe',
    lname:'Swanson',
    email:'123@456.com',
    phone:'(719)574-7782',
    address:'123 N. East St.',
    profPic: profPic,
    active: getMenuActive('settings', activeMenu),
    profPic: profPic
  });
})
.get('/payment', function(req, res, next) {
  res.render('paymentSettings', { 
    title: 'Manage Payment Options',
    msg: 'Manage your payments',
    pageMainClass: 'payment',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    payments: payments,
    fname:'Joe',
    lname:'Swanson',
    email:'123@456.com',
    phone:'(719)574-7782',
    address:'123 N. East St.',
    profPic: profPic,
    active: getMenuActive('settings', activeMenu)
  });
})
.get('/profile', function(req, res, next) {
  res.render('profileSettings', { 
    title: 'Profile Settings',
    msg: 'Profile Settings',
    pageMainClass: 'settingsProfile',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    active: getMenuActive('settings', activeMenu),
    username: req.user.username,
    fname:req.user.f_name|| 'None Set',
    lname: req.user.l_name|| 'None Set',
    email: req.user.email|| 'None Set',
    phone: req.user.phone || 'None Set',
    address: req.user.address|| 'None Set',
    profPic: profPic
  });
})

module.exports = router;