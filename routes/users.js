//import { profPic, payments, cars, map } from '../stubs';
import { profPic, payments, cars, map, subjects, rides, getPayments } from '../controller';
import { authUser, authRole, authBan } from '../basicAuth';
import User from "../backend/models/user";
var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;
var activeMenu;
//import { profPic, payments, cars, map } from '../controller';
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
.post('/signup', (req, res, next)=>{
  console.log(req);
  User.register(new User({
    _id: mongoose.Types.ObjectId(),
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
  }), req.body.password, ((err, user)=>{
    if(err){
      console.log(req.password);
      console.log(err);
      res.send('error signing up: ' + err);
    }else{
      console.log('sign up successful.');
      passport.authenticate('local', { 
        failureRedirect: '/error' 
      })(req, res, () => {
        //error = false;
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/profile');
      });
    }
  })
)})
.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authBan, (req, res) => {
  //console.log(req);
  console.log('=-=-=-=-=-=-=Test=-=-=-=-=-=-');
  console.log('user id: ' + req.user.id);
  try{
    //console.log(JSON.stringify(req.headers));
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    res.statusCode = 200;
    res.redirect('/profile');
    error = false;
    //window.location.reload();

  }catch(err){
    error = true;
    //var path = '/login';
    res.redirect('/login');
  }   
})
.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})
module.exports = router;