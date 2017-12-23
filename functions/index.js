const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const engines = require('consolidate');
const auth = require('./auth');

const app = express();

app.engine('hbs', engines.handlebars );
app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

exports.mosaic_core = functions.https.onRequest(app);
