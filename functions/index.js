const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');

const auth = require('./api/auth');
const routes = require('./api/routes');

// ----------------- FIREBASE CONFIG ----------------- //
// config is now found in config.js:
// 'const firebase = require('./config.js');'
// ---------------------------------------------------- //

const app = express();

// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
// https://medium.com/@atbe/firebase-functions-true-routing-2cb17a5cd288
app.disable("x-powered-by");

// -------------------- VIEW ENGINE -------------------- //
app.engine('hbs', engines.handlebars );
app.set('views', './views');
app.set('view engine', 'hbs');
// ----------------------------------------------------- //

// ----------------------- QUERY ----------------------- //
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// ----------------------------------------------------- //

// ------------------------ API ------------------------ //
// general calls
app.use('/', routes);

// the authentication route in functions/api/auth/index.js
app.use('/auth', auth);

// ----------------------------------------------------- //

exports.mosaic = functions.https.onRequest(app);
