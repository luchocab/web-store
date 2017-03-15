var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended:true });
var methodOverride = require('method-override');
router.use(methodOverride('_method'));

var isLoggedIn = require('../middleware').isLoggedIn;
var isProductOwner = require('../middleware').isProductOwner;
var isCommentOwner = require('../middleware').isCommentOwner;

/* GET productRouter listing. */
router.get('/', function(req, res, next) {
  Product.find({'author' : res.locals.user.id}).populate('author').exec(function (err, data) {
    if(err)
      return res.redirect("/error");
    res.render("products", {myProducts: data});
  });
});

router.post('/', isLoggedIn, function(req, res, next) {
  res.send('post products');//TODO
});

router.get('/new', isLoggedIn, function(req, res, next) {
  res.render('new', {userId: req.user.id, status : 200});
});

router.post('/new',isLoggedIn, urlParser, function(req, res, next) {
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

router.get('/:id/edit', function(req, res, next) {
  Product.findOne({'_id' : req.params.id}, function (err, product) {
    if(err)
      return res.redirect("error");
    res.render('edit', {product});
  });
});

router.delete('/:id',urlParser, function(req, res, next) {
  Product.findByIdAndRemove({'_id' : req.body.id}, function (err, prod) {
    if(err)
      return res.redirect("/error");
    res.json({success : "Updated Successfully", status : 200});
  })
});

router.get('/:id', function(req, res, next) {
  Product.findOne({'_id' : req.params.id}).populate('author').exec(function (err, product) {
    if(err)
      return res.redirect("error");
    res.render('product', {product});
  });
});

router.put('/:product', function (req, res, next) {
  var product = req.product;
  product = _.extend(product, req.body);

  res.send('put products');//TODO
});

module.exports = router;
