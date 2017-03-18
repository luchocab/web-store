var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');

var urlParser = bodyParser.urlencoded({ extended:true });

var User = require('../models/User');
var Product = require('../models/Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, function (err, data) {
    if(err)
      return res.redirect("/error");
    res.render("index", {title: 'Express', products: data});
  });
});

// Registro de un usuario
router.get('/register', function (req, res) {
  res.render('register');
});

// Procesa el registro,
router.post('/register', urlParser, function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.send('hubo un error durante el registro');
    }
    res.send('Se creó el usuario ' + user.username);
  });
});

// Formulario de login
router.get('/login', function(req, res) {
  res.render('login');
});

// Procesa el login, usamos authenticate de passport como middleware.
router.post('/login', urlParser, passport.authenticate('local', {
  failureRedirect: '/register'
}), function(req, res) {
  res.locals.user = req.user;
  Product.find({}, function (err, data) {
    if(err)
      return res.redirect("/error");
  res.render('index', { title: 'Estas logueado', login : true, products: data});
  });
});

// Logout
router.get('/logout', function(req, res){
  console.log('logout');
  req.logout();
  Product.find({}, function (err, data) {
    if(err)
      return res.redirect("/error");
  res.render('index', { title: 'deslogueado', logout : true,products: data});
  });
});

module.exports = router;
