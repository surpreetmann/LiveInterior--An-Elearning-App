var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser =require('body-parser');
var exphbs =require('express-handlebars');
var expressValidator =require('express-validator');
var flash =require('connect-flash');
var session =require('express-session');
var mongo =require('mongodb');
var mongoose =require('mongoose');
var passport =require('passport');
var localStrategy =require('passport-local'),Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
  secret: 'ElearnBySurpreet',
  saveuninitialized: true,
  resave: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace=param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formparam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));

// connect-flash
app.use(flash());

// global vars
app.use(function(req,res,next){
  res.locals.messages=require('express-messages')(req,res);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
