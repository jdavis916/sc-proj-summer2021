var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Loads the handlebars module
const handlebars = require('express-handlebars');
import bodyparser from 'body-parser';
//import mongoose from 'mongoose';
//import cors from 'cors';
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

//database name
// var dbName = 'copFinal';
// var dbConnection = mongoose.connection;

//mongo connection
/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + dbName, {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});*/

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
