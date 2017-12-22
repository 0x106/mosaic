const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const engines = require('consolidate');

const app = express();

app.engine('hbs', engines.handlebars );
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

exports.mosaic = functions.https.onRequest(app);
