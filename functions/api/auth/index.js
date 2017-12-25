const express = require('express');
const firebase = require('../../config.js');

const router = express.Router();

// New user SIGN UP
router.post('/', function(req, res, next) {

    // TODO: check that the password conforms to our specifications
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function(user) {
        user.updateProfile( { displayName: req.body.username } ).then(
          function() {
            // TODO: get user info
            res.render('dashboard', {username: user.displayName})
          }
        );
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // TODO: presumably we can check these errors for things like incorrect formats, duplicates etc?
        res.send('Error creating user:' + error.code + ' --> ' + error.message);
    });
});

// New user LOG IN
router.post('/login', function(req, res, next) {

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function(user) {
        // TODO: get user info - make sure we have the full set of scenes
        res.render('dashboard', {username: user.displayName});
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send('Error signing in user:' + error.code + ' --> ' + error.message);
    });
});

router.get('/logout', function(req, res, next) {
  firebase.auth().signOut().then(function() {
      res.render('index')
    }, function(error) {
      res.send('Error:' + error)
  });
});

module.exports = router;
