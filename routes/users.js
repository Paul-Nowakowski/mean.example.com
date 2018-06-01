var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bodyParser = require('body-parser');


var passport = require('passport');
router.get('/', function(req, res, next) {
  
  res.render('users/index', { title: 'Create an Account' });
});
router.get('/login', function(req, res, next){
  res.render('users/login');
});
router.post('/login',
passport.authenticate('local'),
function(req, res, next){
  res.redirect('ionic/');
});

module.exports = router
