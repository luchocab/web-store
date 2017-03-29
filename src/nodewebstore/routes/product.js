var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var Comment = require('../models/Comment');
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({extended:false});

var middleware = require('../middleware');

/* GET productRouter listing. */
router.get('/', function(req, res) {
  Product.find({'author' : res.locals.user.id}).populate('author').exec(function (err, data) {
    if(err)
      return res.redirect("/error");
    res.render("products", {myProducts: data});
  });
});

router.post('/', middleware.isLoggedIn, function(req, res) {
  res.send('post products');//TODO
});

router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('new', {userId: req.user.id, status : 200});
});

router.post('/new', middleware.isLoggedIn, urlParser, function(req, res) {
  Product.create(req.body, function (err, product) {
    if(err)
      return res.redirect("/error");
    Product.find({'author' : res.locals.user.id}).populate('author').exec(function (err, data) {
      if(err)
        return res.redirect("/error");
      res.render("products", {myProducts: data, saveok: true});
    });
  });
});

router.put('/', middleware.isProductOwner, urlParser, function (req, res) {

  Product.findByIdAndUpdate(req.body.id,{$set:req.body}, function(err, result){
    if(err)
      return res.redirect("/error");
    Product.find({'author' : res.locals.user.id}).populate('author').exec(function (err, data) {
      if(err)
        return res.redirect("/error");
      res.render("products", {myProducts: data, saveok: true});
    });
  });
});

router.delete('/', middleware.isLoggedIn, urlParser, function(req, res) {
  Product.findByIdAndRemove({'_id' : req.body.id}, function (err, prod) {
    if(err)
      return res.redirect("/error");
    prod.comments.forEach(function (comment) {
      Comment.findByIdAndRemove({'_id' : comment}, function (err, comm) {
        if(err)
          return res.redirect("/error");
      });
    });
    res.json({success : "Delete Successfully", status : 200});
  });
});

router.get('/:id/edit', middleware.isProductOwner, function(req, res) {
  Product.findOne({'_id' : req.params.id}, function (err, product) {
    if(err)
      return res.redirect("error");
    res.render('edit', {product});
  });
});

router.get('/:id', function(req, res) {
  Product.findOne({'_id' : req.params.id}).populate('author comments').exec(function (err, prod) {
    var author = {
      path: 'comments.author',
      model: 'User'
    };
    if(err)
      return res.redirect("error");
    Product.populate(prod, author, function (err, product) {
      res.render('product', {product: product});
    });

  });
});

module.exports = router;