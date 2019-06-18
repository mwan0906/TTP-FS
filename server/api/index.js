const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/price', require('./ticker'));

module.exports = router;