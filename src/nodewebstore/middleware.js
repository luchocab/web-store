/**
 * Created by lucho on 4/3/17.
 */
var Product = require('./models/Product');
var Comment = require('./models/Comment');
// Middleware
// Si está autenticado, que siga, si no respondemos que no puede pasar.
// Usamos la función req.isAuthenticated() de Passport.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // puede pasar
    }
    return res.send('<img src="https://i.ytimg.com/vi/qdYifXP5tVA/maxresdefault.jpg"/>');
}

//Middleware
//es el autor del producto?
function isProductOwner(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('auth');
        Product.findById(req.body.id, function(err, product){
            if(err)
                return res.redirect("error");
            else if(product.author.equals(req.user._id)){
                console.log('puede pasar');
                return next(); // puede pasar
            }else{
                return res.redirect("/product/" + req.body.id);
            }
        })
    }
    return res.send('<img src="https://i.ytimg.com/vi/qdYifXP5tVA/maxresdefault.jpg"/>');
}

//Middleware
//es el autor del comentario?
function isCommentOwner(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.c_id, function(err, comment){
            if(err)
                return res.redirect("error");
            else if(comment.author.id.equals(req.user._id)){
                return next(); // puede pasar
            }else{
                return res.redirect("/products/"+req.params.id);
            }
        })
    }
    return res.send('<img src="https://i.ytimg.com/vi/qdYifXP5tVA/maxresdefault.jpg"/>');
}

module.exports = {isLoggedIn, isProductOwner, isCommentOwner};