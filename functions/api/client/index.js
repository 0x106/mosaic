
// https://firebase.google.com/docs/database/web/read-and-write

const express = require('express');
const firebase = require('../../config.js');

const router = express.Router();

// https://www.atlasreality.xyz/client
router.post('/', function(req, res, next) {

      firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then( function(user) {

        firebase.database().ref(`users/${user.uid}/`).once('value').then(function(snapshot) {
          console.log("Valid user.");
          var data = snapshot.val();
          if (data) {
            console.log("Data exists");
            console.log(data);
            console.log(data.userData);
            console.log(data.scenes);
            // var result = {
            //   `${user.uid}` : data
            // };
            // console.log();
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
