/*import { 
  permEditPost,
  permDelPost,
  permProfile,
  permProject,
  viewMessages,
  adminMessages,
  delComment
   } from '../permissions/perms';*/

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

//what page am i on?
/*function getMenuActive(key, menu){
  //gets the list of menu elements
  activeMenu = JSON.parse(JSON.stringify(menu));

  //change the key's value based on page route
  activeMenu[key] = true;
  return activeMenu;
}*/

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Autono',
  	msg: 'Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.',
  	pageMainClass: 'pgHome',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    //active: getMenuActive('home', activeMenu)
  });
})
.get('/contact', function(req, res, next) {
  res.render('contact', { 
    title: 'Contact Us',
    msg: 'Send us a message.',
    pageMainClass: 'contact',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    //active: getMenuActive('contact', activeMenu)
  });
})
.get('/rental', /*authUser*/ function(req, res, next) {
  res.render('rental', { 
    title: 'Rent a Car',
    msg: 'Choose from our selection',
    pageMainClass: 'rental',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    //active: getMenuActive('rental', activeMenu)
  });
})
.get('/profile', /*authUser*/ function(req, res, next) {
  res.render('profile', { 
    title: 'Profile',
    msg: 'Your profile',
    pageMainClass: 'profile',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    //active: getMenuActive('profile', activeMenu)
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
.post('/signup', (req, res, next)=>{
  User.register(new User({
    _id: mongoose.Types.ObjectId(),
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    address: req.body.address,
  }), req.body.password, ((err, user)=>{
    if(err){
      console.log(err);
      res.send('error signing up: ' + err);
    }else{
      console.log('sign up successful.');
      passport.authenticate('local', { 
        failureRedirect: '/error' 
      })(req, res, () => {
        res.setHeader('Content-Type', 'application/json');
        res.send('login and signup successful');
      });
    }
  })
)})
.post('/login', passport.authenticate('local', { failureRedirect: '/error' }), authBan, (req, res) => {
  //console.log(req);
  console.log('=-=-=-=-=-=-=Test=-=-=-=-=-=-');
  console.log(req.user.id);
  try{
    //console.log(JSON.stringify(req.headers));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    res.redirect('/profile');
    //window.location.reload();

  }catch(err){
    var path = '/login';
    res.send(err);
  } 
    
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