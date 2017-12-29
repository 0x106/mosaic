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
    if (req.body.password == req.body.password_confirm) {

      // TODO: investigate why persistence isn't working
      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(

        function(user) {

          var username = capitaliseFirstLetter(req.body.username);

          user.updateProfile( { displayName: username } ).then( function() {

              req.session.user = user;

              console.log('first setting user session' + req.session.user);

              var databaseRef = firebase.database().ref(`users/${user.uid}/scenes/`);
              databaseRef.push().set({aid: 'No scenes uploaded yet.'});

          }).then(function() {

              // firebase.database().ref(`/users/${user.uid}/scenes/`).once('value').then(function(snapshot) {
              //   var scenes = snapshot.val();
              //   res.render('dashboard', {username: user.displayName, uid: user.uid, scenes: scenes});
              // });

              res.redirect('http://www.atlasreality.xyz/auth/dashboard?uid='+user.uid);
              return;
            });

        }, function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              res.send('Error creating user:' + error.code + ' --> ' + error.message); // TODO: render errors appropriately
       });

    } else {
      res.send("Error: Passwords do not match");
    }
});

router.post('/login', function(req, res, next) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then( function(user) {

        req.session.user = user;
        // res.redirect('http://www.atlasreality.xyz/auth/dashboard');
        res.redirect('http://www.atlasreality.xyz/auth/dashboard?uid='+user.uid);
        // firebase.database().ref(`/users/${user.uid}/scenes/`).once('value').then(function(snapshot) {
        //   var scenes = snapshot.val();
        //   res.render('dashboard', {username: user.displayName, uid: user.uid, scenes: scenes});
        // });
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
router.get('/dashboard',

  // (req, res, next) => checkSession(req, res, next),

  function(req, res, next) {

    // we presume we have a user (i.e that they are signed in and a session is stored)
    // var user = req.session.user;
    if (req.session.user) {
      console.log('session stored' + req.session.user);
    } else {
      console.log('no session stored');
    }
    // console.log(`Cookie: ${user.uid} | ${user.username} | ${user.email}`);

    var uid = req.query.uid;
    // TODO: HANDLE SESSIONS
    // TODO: get username from database
    firebase.database().ref(`/users/${uid}/scenes/`).once('value').then(function(snapshot) {
      var scenes = snapshot.val();
      res.render('dashboard', {username: uid, uid: uid, scenes: scenes});
    });
});

module.exports = router;
