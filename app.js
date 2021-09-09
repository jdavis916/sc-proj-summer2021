var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var session = require('express-session');
var passport = require('passport');
import session from 'express-session';
import MongoStore from 'connect-mongo';
var authenticate = require('./authenticate');
//Loads the handlebars module
const handlebars = require('express-handlebars');
//import bodyparser from 'body-parser';
import mongoose from 'mongoose';
//import cors from 'cors';
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var settingsRouter = require('./routes/settings');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');
//var controller = require('./controller');

import bodyparser from 'body-parser';

var app = express();

//database name
var dbName = 'cop_final';
var dbConnection = mongoose.connection;
var pw = encodeURIComponent('pw#321');
var fullConnect;
//mongo connection
try{
	mongoose.Promise = global.Promise;
	fullConnect = mongoose.connect(`mongodb+srv://srrAdmin:${pw}@cluster0.nxxyb.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
		useNewUrlParser: true, 
		useUnifiedTopology: true
	});
	console.log('db connected');
}catch(e){
	console.log('could not connect to db');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//add handlebars
app.engine('hbs', handlebars({
	layoutsDir: __dirname + '/views/layouts',
	partialsDir: __dirname + '/views/partials',
	//new configuration parameter
	extname: 'hbs', 
	defaultLayout: 'main'
}));
const sessionStore = MongoStore.create({ mongoUrl: `mongodb+srv://srrAdmin:${pw}@cluster0.nxxyb.mongodb.net/${dbName}?retryWrites=true&w=majority`,
 dbName: 'cop_final',
collectionName: 'sessions'});
//assigns the client an ID stored on the server
app.use(session({
//secret prevents hijacking and tampering
  secret: 'COP',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  //sets the cookie to expire after 1 day
  cookie: {
  	maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/settings', settingsRouter);
app.use('/users', usersRouter);
app.use('/submit', postRouter);
//app.use('/', controller);
// function auth (req, res, next) {
//   console.log(req.username);

//   if (!req.username) {
//     // var err = new Error('You are not authenticated!');
//     // err.status = 403;
//     // next(err); 
//     res.send('auth error');
//   }
//   else {
//     next();
//   }
// }
// app.use(auth);
//CORS setup
//app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
