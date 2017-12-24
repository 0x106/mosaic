
const express = require('express');
const bcrypt = require('bcrypt');
const firebase = require('firebase-admin');

const router = express.Router();

// let stored = "$2a$10$UuvAvl0ShzvMIwVvjug8SeukQlcO2OU4BioBSCiSOSMw.WD9rGezq";
// let compare = bcrypt.compareSync(req.body.password, hash);
// if(compare) {
//   res.send("passwords MATCH\n");
// } else {
//  res.send("passwords DO NOT MATCH\n");
// }

// New user SIGN UP
router.post('/',
  function(req, res, next) {

    // TODO: check that the password conforms to our specifications

    // hash the password provided
    // TODO: check that the hash was succesfull
    let hash_password = bcrypt.hashSync(req.body.password, 10);

    // TODO: check if we already have an entry for this user

    // create the entry for this user
    // TODO: check that the new user sign up worked?
    var defaultAuth = firebase.auth();
    defaultAuth.createUser({
      email: req.body.email,
      password: hash_password,
      displayName: req.body.username,
    })

    // TODO: send them to the dashboard
    res.status(200).send("New user: " + req.body.username + " created.\n");
});

router.get('/', function(req, res, next) {
  res.send('get auth request\n');
});

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
