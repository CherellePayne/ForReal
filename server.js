const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3001;

// app
//   .use(bodyParser.json())
//   .use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   })
//   .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


  //Used in team assignment video- minimal way
  // process.on('uncaughtException', (err, origin) => {
  //   console.log(process.stderr.id, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  // });

  // catch err
  // const db = require('./models');
  // db.mongoose
  //   .connect(db.url, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   })
  //   .then(() => {
  //     app.listen(port, () => {
  //       console.log(`DB Connected and server running on ${port}.`);
  //     });
  //   })
  //   .catch((err) => {
  //     console.log('Cannot connect to the database!', err);
  //     process.exit();
  //   });
 
  