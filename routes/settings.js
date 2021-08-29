var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;
router
.get('/', function(req, res, next) {
  res.render('settings', { 
    title: 'Settings',
    msg: 'Change your settings',
    pageMainClass: 'settings',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    active: getMenuActive('settings', activeMenu)
  });
})
.get('/payment', function(req, res, next) {
  res.render('settings', { 
    title: 'Manage Payment Options',
    msg: 'Manage your payments',
    pageMainClass: 'payment',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    active: getMenuActive('payment', activeMenu)
  });
})

module.exports = router;