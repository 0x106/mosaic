
// https://firebase.google.com/docs/database/web/read-and-write

const express = require('express');
const firebase = require('../../config.js');
const bodyParser = require('body-parser');

const router = express.Router();
//
router.post('/test', function(req, res, next) {
  console.log("POST client");
  // console.log(req.query.email);
  res.send({"b":"post /client/ios"});
});

// https://www.atlasreality.xyz/client/test
router.get('/', function(req, res, next) {

      var email = req.query.email;
      var password = req.query.password;

      console.log(email);
      console.log(password);

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

module.exports = router;
