import { 
  sanitizeArr, 
  parseDate,
  profPic, 
  payments, 
  cars, 
  map, 
  subjects, 
  getRides, 
  getCars, 
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
const {body, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose').set('debug', true);
var db = mongoose.connection;
var error = false;
var details = [];

router
.post('/rentcar', body('address').matches(/^[a-zA-Z0-9 .-]*$/).trim(), function(req,res,next){
  
  details = ['Payment method: ' + req.body.payment,'Start Time: ' + req.body.startTime,
    'End Time: ' + req.body.endTime,'Pickup Location: ' + req.body.pickupLocation];
    var err = validationResult(req);
       if (!err.isEmpty()) {
           console.log(err.mapped())
           // you stop here 
       }else{
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
  })} 
})
//contact post route
.post('/contact', sanitizeArr, function(req,res,next){
  //console.log('validator body: ' + body);
  console.log(req.body);
  var err = validationResult(req);
       if (!err.isEmpty()) {
           res.send('error: invalid characters in form.')
           // you stop here 
       }else{
  const contactMsg = new ContactModel({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    subject: req.body.subject,
    phone: req.body.phone,
    email: req.body.email,
    msg: req.body.msg,
    date: parseDate()
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
  })}
})
.post('/profupdate', sanitizeArr, async function(req,res,next){
  var err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err.mapped())
           // you stop here 
  }else{
    var filter = {_id: req.user._id};
    var update = {"$set":{
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    }};
    try{
      let upd = await User.findOneAndUpdate(filter, update,{
        returnOriginal: false,
        returnNewDocument: true,
        //useFindAndModify: false
      }, function(err, result){
        if(err){
          res.send(err);
        }
        console.log('result: ' + result);
      })/*.then((res,err)=>{
        if(err){
          console.log(err);
        }
        console.log('update success');
      })
*/     res.redirect('/login');
    }catch(err){
      console.log(err);
    }
  }
})

module.exports = router;