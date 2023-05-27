const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
//added line 6 for Lo6 for validation 
router.use('/user,require'('./user'));
router.use('/temples', require('./temples'));

module.exports = router;
