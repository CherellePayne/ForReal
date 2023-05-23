const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/temples', require('./contacts'));

module.exports = router;

