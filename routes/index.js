const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
};
const express = require('express');
const router = express.Router();

router.use(auth(config));//someting is wromg here
router.get('/checkingLoginStatus', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
 });

router.use('/', require('./swagger'));
router.use('/temples', require('./temples'));

module.exports = router;

// from OAuth video
// router.get("/", (req, res) => {
//     console.log (req.oidc.isAuthenticated());
//     res.render("index", {
//         title: "Express Demo"
//         isAuthenticated: req.oidc.isAuthenticated(),
// });
// });

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   });

