/**
 * Created by lucho on 4/3/17.
 */
var express = require('express');
var router = express.Router();

var middleware = require('../middleware');
var bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended:true });
var methodOverride = require('method-override');
router.use(methodOverride('_method'));

//models
var Product = require('../models/Product');
var Comment = require('../models/Comment');

router.post('/new',middleware.isLoggedIn, urlParser, function(req, res, next) {
    var com={
        author:req.body.author,
        body:req.body.body
    };
    console.log(com);
    Product.findById(req.body.p_id, function (err, product) {
        if(err)
            return res.redirect("/error");
        console.log(product);
        Comment.create(com, function (err, comment) {
            if(err)
                return res.redirect("/error");

            product.comments.unshift(comment);
            product.save();
            res.send('comentario guardado');
        });
    });
});

router.put('/', urlParser, function (req, res, next) {
    Comment.findByIdAndUpdate(req.body.c_id,{$set:req.body}, function(err, result){
        if(err)
            return res.redirect("/error");
        res.send('comentario modificado');
    });
});

router.delete('/:id',urlParser, function(req, res, next) {
    Comment.findByIdAndRemove({'_id' : req.body.id}, function (err, prod) {
        if(err)
            return res.redirect("/error");
        res.json({success : "Delete Successfully", status : 200});
    })
});

/* GET commentRouter page. */
router.get('/:id', function(req, res, next) {
    res.send('comment');
});

module.exports = router;
