const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
// const port = process.env.PORT;
const port = process.env.PORT||3002;
const app = express();

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));//something is wrong here

  //from Brother Birch's code, catch all that keeps it running but logs the error
// process.on('uncaughtException', (err, origin) => {
//   console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
// });



app.get('/', (req, res) => {
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });


  