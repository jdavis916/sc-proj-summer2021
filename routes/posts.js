import { 
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

var express = require('express');
var router = express.Router();
var passport = require('passport');
const mongoose = require('mongoose').set('debug', true);
var db = mongoose.connection;
var error = false;
var details = [];

router
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
  });
})

module.exports = router;