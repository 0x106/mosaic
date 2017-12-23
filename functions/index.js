const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const engines = require('consolidate');
const auth = require('./api/auth');

const app = express();

// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
// https://medium.com/@atbe/firebase-functions-true-routing-2cb17a5cd288
app.disable("x-powered-by");

// -------------------- VIEW ENGINE -------------------- //
app.engine('hbs', engines.handlebars );
app.set('views', './views');
app.set('view engine', 'hbs');
// ----------------------------------------------------- //

// ------------------------ API ------------------------ //
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

// app.post('/auth', function(req, res) {
//     res.status(200).send('')
// });
// the authentication route in functions/api/auth/index.js
app.use('/auth', auth);

app.get('/faq', (req, res) => {
    res.status(200).send('“Cyberspace. A consensual hallucination experienced daily by billions of legitimate operators, \
    in every nation, by children being taught mathematical concepts... A graphic representation of data abstracted from banks \
    of every computer in the human system. Unthinkable complexity. Lines of light ranged in the nonspace of the mind, clusters \
    and constellations of data. Like city lights, receding...”\
    - William Gibson, Neuromancer.')
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
// ----------------------------------------------------- //

exports.mosaic = functions.https.onRequest(app);
