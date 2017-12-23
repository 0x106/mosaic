const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const engines = require('consolidate');
// const auth = require('./auth');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
const dotenv = require('dotenv');

// ------------------- AUTHENTICATION ------------------- //
dotenv.load();
// This will configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);
passport.use(strategy);
// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
// ------------------------------------------------------ //

const app = express();

// -------------------- VIEW ENGINE -------------------- //
app.engine('hbs', engines.handlebars );
app.set('views', './views');
app.set('view engine', 'hbs');
// ----------------------------------------------------- //

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
