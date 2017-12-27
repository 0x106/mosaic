const express = require('express');
const firebase = require('../../config.js');

const router = express.Router();

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// New user SIGN UP
router.post('/', function(req, res, next) {
    // TODO: check that the password conforms to our specification

    // first check that the passwords match?
    // TODO: indicate to the user whether they match while they are typing
    if (req.body.password == req.body.password_confirm) {

      firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function(user) {
          var username = capitaliseFirstLetter(req.body.username)
          // TODO: after we update the profile we need to update the database to add the `users/${userID}/scenes` field
          // otherwise this returns null and i think generates an error
          user.updateProfile( { displayName: username } ).then( function() {
              var databaseRef = firebase.database().ref(`users/${user.uid}/scenes/`);
              databaseRef.push().set({});
            }).then(function() {
              // res.redirect('https://www.atlasreality.xyz/auth/dashboard');
              res.redirect('https://www.atlasreality.xyz/'); // for now
              return;
          });
      }, function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // TODO: render errors appropriately
          res.send('Error creating user:' + error.code + ' --> ' + error.message);
      });
    } else {
      res.send("Error: Passwords do not match");
    }
});

// New user LOG IN
router.post('/login', function(req, res, next) {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function(user) {

      // renderDashboard();
      res.redirect('https://www.atlasreality.xyz/auth/dashboard');
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

// TODO: move this into its own file (users.js?)
router.get('/dashboard', (req, res) => {

  // get the currently signed in user and then render their data
  // if no user is currently signed in then send them to the login page res.render('signup')
  firebase.auth().onAuthStateChanged(function(user) {
      if(user) { // if there is a currently signed in user
        firebase.database().ref(`/users/${user.uid}/scenes/`).once('value').then(function(snapshot) {
          var scenes = snapshot.val();
          console.log(scenes);
          res.render('dashboard', {username: user.displayName, uid: user.uid, scenes: scenes});
        });
      } else {
         res.redirect('http://www.atlasreality.xyz/signup');
         return;
      }
  });
});


module.exports = router;
