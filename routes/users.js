var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//to include the user ,student and instructor model
var User = require('../models/user');
var Instructor = require('../models/student');
var Student = require('../models/instructor');

//User Registering
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

//Register user
router.post('/register', function(req, res, next) {
  //to fetch form values
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var street_address = req.body.street_address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var type = req.body.type;

  //and then validate the form
  req.checkBody('first_name', 'First Name field is required').notEmpty();
  req.checkBody('last_name', 'Last Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Your Email must be a valid Email address').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Both passwords must match').equals(req.body.password);

  //for errors
  errors = req.validationErrors();
  if(errors){
    res.render('users/register', {
      errors : errors
    });
  }
  else{

  }
});

module.exports = router;
