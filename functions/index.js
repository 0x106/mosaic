const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');
const auth = require('./api/auth');


// ----------------- FIREBASE CONFIG ----------------- //
var admin = require("firebase-admin");

// TODO: test this
// admin.initializeApp(functions.config().firebase);
var serviceAccount = require("./key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mosaic-portal.firebaseio.com"
});
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
app.get('/', (req, res) => {
  res.render('index');
});

// TODO: move this into its own file
app.get('/signup', (req, res) => {
  res.render('signup');
});

// the authentication route in functions/api/auth/index.js
app.use('/auth', auth);

// TODO: move this into its own file
app.get('/faq', (req, res) => {
    res.status(200).send('“Cyberspace. A consensual hallucination experienced daily by billions of legitimate operators, \
    in every nation, by children being taught mathematical concepts... A graphic representation of data abstracted from banks \
    of every computer in the human system. Unthinkable complexity. Lines of light ranged in the nonspace of the mind, clusters \
    and constellations of data. Like city lights, receding...”\
    - William Gibson, Neuromancer.')
});

// TODO: move this into its own file
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
// ----------------------------------------------------- //

exports.mosaic = functions.https.onRequest(app);
