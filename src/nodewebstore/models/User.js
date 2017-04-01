/**
 * Created by lucho on 4/3/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose'); // Plugin para tener las funciones de passport en mi modelo

var User = new Schema({
    name: {type: String, required: true},
    lastName: {type:String, required: true},
    avatar:{type: String}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);