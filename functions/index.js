const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
var cookieParser = require('cookie-parser');
const session = require('client-sessions');
const firebase = require('./config.js');

// ----------------- FIREBASE CONFIG ----------------- //
// config is now found in config.js:
// 'const firebase = require('./config.js');'
// ---------------------------------------------------- //

const app = express();

// --------------------- SESSIONS --------------------- //
// configure the session middleware as per:
//      - https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions
//      - https://github.com/fmarier/node-client-sessions-sample/blob/master/demo.js
app.use(session({
  cookieName: '__session',
  secret: '(^C*S&CBS87d4c%b8&sydc@8&B8&%bsdb*',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

app.use(function(req, res, next) {
  if (req.__session && req.__session.user) {
    var prevUser = req.__session.user;
    firebase.database().ref(`users/${prevUser.uid}/userData/`).once('value').then(function(snapshot) {
        var data = snapshot.val();
        if (data.hasOwnProperty('userData')) {
          if (data.userData) {
            req.__session.user = data.userData;
          }
          next();
        }
    });
  } else {
    // no session in use (no one logged in)
    //    any route that checks for a session user will ONLY
    //    get data if they are properly logged in and recorded.
    next();
  }
});
// ---------------------------------------------------- //

const auth = require('./api/auth');
const routes = require('./api/routes');

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
app.use(cookieParser());
// ----------------------------------------------------- //

// ------------------------ API ------------------------ //
// general calls
app.use('/', routes);

// the authentication route in functions/api/auth/index.js
app.use('/auth', auth);

// ----------------------------------------------------- //

exports.mosaic = functions.https.onRequest(app);
