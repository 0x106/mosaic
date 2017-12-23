const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const engines = require('consolidate');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();

app.engine('hbs', engines.handlebars );
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
});

exports.mosaic = functions.https.onRequest(app);
