var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes/index'))

app.listen(3000, () => {
    console.log(`Running on port ${port}`)

});

