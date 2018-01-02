
// https://firebase.google.com/docs/database/web/read-and-write

const express = require('express');
const firebase = require('../../config.js');

const router = express.Router();

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function requireLogin (req, res, next) {
  if (!req.__session.user) {
    res.redirect('/signup');
  } else {
    next();
  }
};

// New user SIGN UP
router.post('/', function(req, res, next) {

      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(

        function(user) {

          var username = capitaliseFirstLetter(req.body.username);

          user.updateProfile( { displayName: username } ).then( function() {

              var userData = {
                username: user.displayName,
                uid: user.uid,
                email: user.email,
              };

              req.__session.user = userData;

              var databaseDataRef = firebase.database().ref(`users/${user.uid}/userData`);
              databaseDataRef.set({ userData: userData });

          }).then(function() {
              res.redirect('/auth/dashboard');
              return;
            });

        }, function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
              return;
       });
});

// user was previously logged out so when they log back in we need to save the
//    __session coookie.
router.post('/login', function(req, res, next) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then( function(user) {

        var userData = {
          username: user.displayName,
          uid: user.uid,
          email: user.email
        };

        req.__session.user = userData;
        res.redirect('/auth/dashboard');
        return;

    }, function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // res.send('Error signing in user:' + error.code + ' --> ' + error.message);
        alert(errorMessage);
        return;
    });
});

router.post('/iOSauth', function(req, res, next) {
  var message = "Received auth request from iOS client.";
  res.status(200).send(message);
}

// User requested LOGOUT
router.get('/logout', function(req, res, next) {
  firebase.auth().signOut().then(function() {
      // delete the auth cookie.
      if (req.__session && req.__session.user) {
        req.__session.reset();
      }
      res.redirect('http://www.atlasreality.xyz/')
      return;
    }, function(error) {
      alert(error.message);
      return;
  });
});

router.get('/dashboard',

  requireLogin,

  function(req, res, next) {
    var user = req.__session.user
    firebase.database().ref(`users/${user.uid}/scenes/`).once('value').then(function(snapshot) {
        var scenes = snapshot.val();
        if (scenes) {
          res.render('dashboard', {uid: user.uid, username: user.username, scenes: scenes, noScenes: false});
        } else {
          // res.render('dashboard', {uid: user.uid, username: user.username, scenes: {"null": "null"}, noScenes: true});
          res.render('dashboard', {uid: user.uid, username: user.username, scenes: {}, noScenes: true});
        }
    });
});

module.exports = router;
