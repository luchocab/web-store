/**
 * Created by lucho on 4/3/17.
 */
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
    return true; //TODO
}

//Middleware
//es el autor del comentario?
function isCommentOwner(req, res, next) {
    return true; //TODO
}

module.exports = {isLoggedIn, isProductOwner, isCommentOwner};