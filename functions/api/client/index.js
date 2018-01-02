
// https://firebase.google.com/docs/database/web/read-and-write

const express = require('express');
const firebase = require('../../config.js');
const bodyParser = require('body-parser');

const router = express.Router();
//
router.post('/ios/test', function(req, res, next) {
  console.log("POST client");
  console.log(req.query.email);
  res.send({"b":"post /clien/iost"});
});

// https://www.atlasreality.xyz/client/test
router.post('/', function(req, res, next) {

      var email = req.query.email;
      var password = req.query.password;

      firebase.auth().signInWithEmailAndPassword(email, password).then( function(user) {

        firebase.database().ref(`users/${user.uid}/`).once('value').then(function(snapshot) {
          var data = snapshot.val();
          if (data) {
            var result = {
              "user" : data.userData,
              "scenes" : data.scenes,
            };
            res.send(data);
          } else {
            console.log("Data does not exist");
            var result = {
              "errorCode" : "-1",
              "errorMessage" :  "No data available"
            };
            res.send(result);
          }
        });

      }, function(error) {
        console.log("Error logging in.");
          var result = {
            "errorCode" : error.code,
            "errorMessage" :  error.message
          };
          res.send(result);
      });

});

router.post('/client-test', function(req, res, next) {
  var message = {
    "result": "Accessed client route."
  }

  res.send(message)
  // res.send("Accessed client route.");
});

module.exports = router;
