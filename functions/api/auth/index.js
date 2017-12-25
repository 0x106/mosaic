
const express = require('express');
const bcrypt = require('bcrypt');
// const admin = require('firebase-admin');

const firebase = require('firebase');
var config = {
    apiKey: "AIzaSyBI9kkVq2jZNpTKjaX79BqgcepavI9wzQs",
    authDomain: "mosaic-portal.firebaseapp.com",
    databaseURL: "https://mosaic-portal.firebaseio.com",
    projectId: "mosaic-portal",
    storageBucket: "mosaic-portal.appspot.com",
    messagingSenderId: "958527622038"
  };
firebase.initializeApp(config);

const router = express.Router();

// let stored = "$2a$10$UuvAvl0ShzvMIwVvjug8SeukQlcO2OU4BioBSCiSOSMw.WD9rGezq";
// let compare = bcrypt.compareSync(req.body.password, hash);
// if(compare) {
//   res.send("passwords MATCH\n");
// } else {
//  res.send("passwords DO NOT MATCH\n");
// }

// New user SIGN UP
router.post('/', function(req, res, next) {

    // TODO: check that the password conforms to our specifications

    // hash the password provided
    // TODO: check that the hash was succesfull
    // let hash_password = bcrypt.hashSync(req.body.password, 10);

    // TODO: check if we already have an entry for this user

    // create the entry for this user
    // TODO: check that the new user sign up worked?
    // var defaultAuth = firebase.auth();
    // defaultAuth.createUser({
    //   email: req.body.email,
    //   password: hash_password,
    //   displayName: req.body.username,
    // });

    // admin.auth().createUser({
    //   email: req.body.email,
    //   emailVerified: false,
    //   password: req.body.password,
    //   displayName: req.body.username,
    //   disabled: false
    // })
    //   .then(function(userRecord) {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log("Successfully created new user:", userRecord.uid);
    //     // res.status(200).send("New user: " + userRecord.uid + " created.\n");
    //   })
    //   .catch(function(error) {
    //     console.log("Error creating new user:", error);
    //   });

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

    // TODO: Check that we even need to hash passwords (does Firebase handle that?)

    // TODO: check that the password conforms to our specifications

    // hash the password provided
    // TODO: check that the hash was succesfull
    // let hash_password = bcrypt.hashSync(req.body.password, 10);

    // TODO: check if we already have an entry for this user

    // create the entry for this user
    // TODO: check that the new user sign up worked?
    // var defaultAuth = firebase.auth();
    // defaultAuth.createUser({
    //   email: req.body.email,
    //   password: hash_password,
    //   displayName: req.body.username,
    // });

    // firebase.auth().signInWithEmailAndPassword({
    //   email: req.body.email,
    //   password: req.body.password,
    // })
    //   .then(function(userRecord) {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log("Successfully logged in user:", userRecord.uid);
    //     res.status(200).send("User: " + userRecord.uid + "successfully logged in");
    //   })
    //   .catch(function(error) {
    //     console.log("Error logging in user:", error);
    //   });

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    // TODO: send them to the dashboard
    res.status(200).send("New user signed in.\n");
});

// router.get('/', function(req, res, next) {
  // res.send('get auth request\n');
// });

module.exports = router;




// The code below was the first attempt - probably doesn't need to be kept
// ------------------------------------------------------------------------
// const express = require('express');
//
// // even those these two files are in the same dir!
// const authCore = require("./authCore");
// const router = express.Router();
//
// // a new user sign up
// router.post('/',
//   function(req, res, next) {
//     res.status(200).send(req.body.username)
//   }
// );
//
// module.exports = router;
//
// // https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
