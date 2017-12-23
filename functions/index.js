const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const engines = require('consolidate');
// const auth = require('./auth');

const app = express();

app.engine('hbs', engines.handlebars );
app.set('views', './views');
app.set('view engine', 'hbs');

// the authentication route in ./auth.js
// app.use('/auth', auth);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/auth', (req, res) => {
    res.status(200).send('neuromancer')
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

exports.router = functions.https.onRequest(app);
