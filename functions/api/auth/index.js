const express = require('express');
const firebase = require('../../config.js');

const router = express.Router();

// New user SIGN UP
router.post('/', function(req, res, next) {

    // TODO: check that the password conforms to our specifications
    // firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then(function(user) {
        user.updateProfile( { displayName: req.body.username } );
        // TODO: get user info
        res.render('dashboard', {username: user.displayName})
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // TODO: presumably we can check these errors for things like incorrect formats, duplicates etc?
        res.send('Error creating user:' + error.code + ' --> ' + error.message);
    });

        // user.updateProfile({
        //     displayName: req.body.username
        // }).then(function() {
        //       // Update successful.
        //
        //       // get user data from database (everything we need to render the dashboard)
        //       // i.e. the list of scenes that have been uploaded
        //       // var userData = {};
        //       // res.render('dashboard', {userData:, userData})
        //
        // }, function(error) {
        //       res.send('Error retrieving user data');
        //    });


    // TODO: send them to the dashboard
    // res.status(200).send("New user created.\n");
    // res.render('thankyouPage', {username: req.body.username})
});

// New user LOG IN
router.post('/login', function(req, res, next) {

    // firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // });

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then(function(user) {
        // var user = firebase.auth().currentUser;
        // getUserDataForDashboard(user); // Optional
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send('Error signing in user:' + error.code + ' --> ' + error.message);
    });

    // TODO: send them to the dashboard
    // res.status(200).send("New user signed in.\n");
    res.render('dashboard')
});

module.exports = router;
