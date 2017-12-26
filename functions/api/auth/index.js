const express = require('express');
const firebase = require('../../config.js');

// https://stackoverflow.com/a/39180855/7098234
const cors = require('cors');
var corsOptions = {
  origin: 'https://www.atlasreality.xyz/', // only allow requests from this domain (client-side)
  optionsSuccessStatus: 200
};

const router = express.Router();

// New user SIGN UP
router.post('/', function(req, res, next) {
    // TODO: check that the password conforms to our specification
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function(user) {
        user.updateProfile( { displayName: req.body.username } ).then( function() {
          res.render('dashboard', {username: user.displayName})
        });
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // TODO: render errors appropriately
        res.send('Error creating user:' + error.code + ' --> ' + error.message);
    });
});

// New user LOG IN
router.post('/login', function(req, res, next) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function(user) {
      firebase.auth().onAuthStateChanged(function(user) {
        if(user) {
          res.render('dashboard', {username: user.displayName})
        } else {
          res.render('signup');
        }
      });
    }, function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // TODO: render errors appropriately
        res.send('Error signing in user:' + error.code + ' --> ' + error.message);
    });
});

// User requested LOGOUT
router.get('/logout', function(req, res, next) {
  firebase.auth().signOut().then(function() {
      // renderIndex(res);
      res.render('index');
    }, function(error) {
      res.send('Error:' + error)
  });
});

// TODO: move this into its own file (users.js?)
router.get('/dashboard', cors(corsOptions), (req, res) => {

  // get the currently signed in user and then render their data
  // if no user is currently signed in then send them to the login page res.render('signup')
  firebase.auth().onAuthStateChanged(function(user) {
      if(user) { // if there is a currently signed in user
        res.render('dashboard', {username: 'logged in (GET dashboard [server])'});
      } else {
         res.render('signup');
      }
  });
  // res.render('dashboard');
});


module.exports = router;
