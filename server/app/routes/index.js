'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/users', require('./users'));
router.use('/product', require('./product'));
router.use('/order', require('./order'));
router.use('/cart', require('./cart'));
router.use('/card', require('./card'));
router.use('/contact', require('./contact'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res, next) {
    var err = new Error('Not found.');
    err.status = 404;
    next(err);
});
