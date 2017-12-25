const express = require('express');
const bcrypt = require('bcrypt');
const firebase = require('../../config.js');

const router = express.Router();

// New user SIGN UP
router.post('/', function(req, res, next) {

    // TODO: check that the password conforms to our specifications
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    // TODO: send them to the dashboard
    res.status(200).send("New user created.\n");
});

// New user LOG IN
router.post('/login', function(req, res, next) {

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    // TODO: send them to the dashboard
    res.status(200).send("New user signed in.\n");
});

module.exports = router;
