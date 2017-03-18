var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended:true });
var methodOverride = require('method-override');
router.use(methodOverride('_method'));

var middleware = require('../middleware');

/* GET productRouter listing. */
router.get('/', function(req, res, next) {
  Product.find({'author' : res.locals.user.id}).populate('author').exec(function (err, data) {
    if(err)
      return res.redirect("/error");
    res.render("products", {myProducts: data});
  });
});

router.post('/', middleware.isLoggedIn, function(req, res, next) {
  res.send('post products');//TODO
});

router.get('/new', middleware.isLoggedIn, function(req, res, next) {
  res.render('new', {userId: req.user.id, status : 200});
});

router.post('/new', middleware.isLoggedIn, urlParser, function(req, res, next) {
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

router.put('/', urlParser, function (req, res, next) {

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
  Product.findOne({'_id' : req.params.id}).populate('author comments').exec(function (err, prod) {
    var author = {
      path: 'comments.author',
      model: 'User'
    };
    if(err)
      return res.redirect("error");
    Product.populate(prod, author, function (err, product) {
      res.render('product', {userId: req.user.id, product: product});
    });

  });
});



module.exports = router;
