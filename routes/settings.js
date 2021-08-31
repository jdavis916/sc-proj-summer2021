var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;
//import {loginStatus,whoIs} from './index';
//logged in variable
import { profPic, payments, cars } from '../stubs';
function loginStatus(req){
  return (req.user)? true: false;
}

//gets the users first name
function whoIs(req){
  return (req.user) ? (req.user.f_name) : undefined;
}

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
    profPic: profPic
    //active: getMenuActive('settings', activeMenu)
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
    profPic: profPic
    //active: getMenuActive('payment', activeMenu)
  });
})
.get('/profile', function(req, res, next) {
  res.render('profileSettings', { 
    title: 'Profile Settings',
    msg: 'Profile Settings',
    pageMainClass: 'settingsProfile',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    //active: getMenuActive('payment', activeMenu),
    fname:'Joe',
    lname:'Swanson',
    email:'123@456.com',
    phone:'(719)574-7782',
    address:'123 N. East St.',
    profPic: profPic
  });
})

module.exports = router;