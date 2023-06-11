const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/temples', require('./temples'));

// from OAuth video
// router.get('/', (req, res) => {
//     console.log (req.oidc.isAuthenticated());
// res.render("index", {title: "Express Demo"});
// });

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   });

module.exports = router;