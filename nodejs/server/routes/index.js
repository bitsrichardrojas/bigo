const express = require('express');
const app = express();

app.use( require('./Payment') );
app.use( require('./PaymentHistory') );

module.exports = app;