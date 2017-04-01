/**
 * Created by lucho on 4/3/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    name : {type: String, required: true},
    description : {type: String, required: true},
    price : {type: Number, required: true},
    img : {type: String},
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
    }]
});

module.exports = mongoose.model('Product', Product);