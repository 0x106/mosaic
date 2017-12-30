const express = require('express');
const firebase = require('../../config.js');
// const session = require('client-sessions');

const router = express.Router();

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// New user SIGN UP
router.post('/', function(req, res, next) {
    // TODO: check that the password conforms to our specification

    // TODO: indicate to the user whether they match while they are typing
    // if (req.body.password == req.body.password_confirm) {

      // TODO: investigate why persistence isn't working
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(

        function(user) {

          var username = capitaliseFirstLetter(req.body.username);

          user.updateProfile( { displayName: username } ).then( function() {

              req.__session.user = user;

              var databaseRef = firebase.database().ref(`users/${user.uid}/scenes/`);
              databaseRef.push().set({aid: 'No scenes uploaded yet.'});

          }).then(function() {
              res.redirect('/auth/dashboard');
              return;
            });

        }, function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              res.send('Error creating user:' + error.code + ' --> ' + error.message); // TODO: render errors appropriately
       });

    // } else {
      // alert("Passwords do not match");
      // return;
    // }
});

// user was previously logged out so when they log back in we need to save the
// __session coookie.
router.post('/login', function(req, res, next) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then( function(user) {

        req.__session.user = user;
        res.redirect('/auth/dashboard');
        return;

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
      res.redirect('http://www.atlasreality.xyz/')
      return;
    }, function(error) {
      res.send('Error:' + error)
  });
});

// TODO: add requireLogin
router.get('/dashboard', function(req, res, next) {

    if (req.__session.user) {
      console.log('session stored' + req.__session.user);
    } else {
      console.log('no session stored');
    }
    res.render('dashboard');
});

module.exports = router;
