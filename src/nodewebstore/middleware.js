/**
 * Created by lucho on 4/3/17.
 */
var Product = require('./models/Product');
var Comment = require('./models/Comment');
// Middleware
// Si está autenticado, que siga, si no respondemos que no puede pasar.
// Usamos la función req.isAuthenticated() de Passport.
function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
        res.send('<img src="https://i.ytimg.com/vi/qdYifXP5tVA/maxresdefault.jpg"/>');
    return next(); // puede pasar
}

//Middleware
//es el autor del producto?
function isProductOwner(req, res, next) {
    if (!req.isAuthenticated())
        res.send('<img src="https://i.ytimg.com/vi/qdYifXP5tVA/maxresdefault.jpg"/>');
    //si esta logueado
    var id = (req.body.id) ? req.body.id : req.params.id;
    Product.findById(id, function(err, product){
        if(err)
            res.redirect("error");
        else if(product.author.equals(req.user._id)){
            next(); // puede pasar
        }else{
            res.redirect("back");
        }
    })
}

//Middleware
//es el autor del comentario?
function isCommentOwner(req, res, next) {
    if (!req.isAuthenticated()) //si no esta logueado  
        res.send('<img src="https://i.ytimg.com/vi/qdYifXP5tVA/maxresdefault.jpg"/>');
    //si esta logueado
    Comment.findById(req.body.c_id, function(err, comment){
        if(err)
            res.redirect("error");
        else if(comment.author.equals(req.user._id)){
            next(); // puede pasar
        }else{
            res.redirect("back");
        }
    })
}

module.exports = {isLoggedIn, isProductOwner, isCommentOwner};