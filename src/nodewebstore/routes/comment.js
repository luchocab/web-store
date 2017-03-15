/**
 * Created by lucho on 4/3/17.
 */
var express = require('express');
var router = express.Router();

/* GET commentRouter page. */
router.get('/:id', function(req, res, next) {
    res.send('comment');
});


module.exports = router;
