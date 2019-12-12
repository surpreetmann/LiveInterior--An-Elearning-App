var express = require('express');
var router = express.Router();

//Register user
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

module.exports = router;
