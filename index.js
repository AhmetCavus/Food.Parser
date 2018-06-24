'use strict';

require('dotenv').config();
var express = require('express');
var app = express();

// The router is the point of contact for queries 
// that are forwarded to the controller.
require('./router/main.router')(app);

app.listen(process.env.PORT, () => {
    console.log(process.env.STARTLOG + process.env.PORT);
});

 // The app must be exportet for testing purposes
module.exports = app;