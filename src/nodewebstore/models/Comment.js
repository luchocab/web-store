/**
 * Created by lucho on 4/3/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    body : {type: String}
});

module.exports = mongoose.model('Comment', Comment);