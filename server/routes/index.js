var express = require('express');
var router = express.Router();

router.use('/todo', require('./todo'));
router.use('/post', require('./post'));
router.use('/noti', require('./notificate'));
router.use('/user', require('./user'));
router.use('/product', require('./product'));
router.use('/category', require('./category'));

module.exports = router;