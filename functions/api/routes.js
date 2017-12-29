const express = require('express');
const firebase = require('../config.js');
const router = express.Router();

// function globalSessionCheck(req, res, next) {
//
//   // if a session token is available?
//   if (req.session && req.session.user) {
//
//     firebase.database().ref(`/users`).once('value').then(function(snapshot) {
//       var users = snapshot.val();
//       console.log(users);
//       Object.keys(users).forEach(function(key,index) {
//           // key: the name of the object key
//           // index: the ordinal position of the key within the object
//           console.log(key + ' ' + req.session.user.uid);
//           if(key == req.session.user.uid) {
//             console.log('key match');
//             req.user = users[key];
//             req.session.user = users[key];
//             res.locals.user = users[key];
//           }
//       });
//       console.log(req.user);
//     });
//
//     next();
//
//     // admin.auth().getUser(uid)
//     //   .then(function(userRecord) {
//     //     // See the UserRecord reference doc for the contents of userRecord.
//     //     console.log("Successfully fetched user data:", userRecord.toJSON());
//     //   })
//     //   .catch(function(error) {
//     //     console.log("Error fetching user data:", error);
//     //   });
//
//     // User.findOne({ email: req.session.user.email }, function(err, user) {
//       // if (user) {
//         // req.user = user;
//         // delete req.user.password; // delete the password from the session
//         // req.session.user = user;  //refresh the session value
//         // res.locals.user = user;
//       // }
//       // finishing processing the middleware and run the route
//       // next();
//     // });
//   } else {
//     next();
//   }
// });

router.get('/', function(req, res, next) {
  // check if the user is logged in and if so then redirect to the dashboard

  // console.log(`req.session: ${req.session}`);
  // console.log(`req.session.user: ${req.session.user}`);

  // if (req.session && req.session.user) {
  //
  //   firebase.database().ref(`/users`).once('value').then(function(snapshot) {
  //     var users = snapshot.val();
  //     console.log('users:' + users);
  //     Object.keys(users).forEach(function(key,index) {
  //         // key: the name of the object key
  //         // index: the ordinal position of the key within the object
  //         console.log(key + ' ' + req.session.user.uid);
  //         if(key == req.session.user.uid) {
  //           console.log('key match');
  //           req.user = users[key];
  //           req.session.user = users[key];
  //           res.locals.user = users[key];
  //         }
  //     });
  //     console.log(req.user);
  //   });
  // } else {
    res.render('index');
  // }
});

// TODO: move this into its own file (routes.js?)
router.get('/signup', (req, res) => {
  res.render('signup');
});

// TODO: move this into its own file
router.get('/faq', (req, res) => {
    res.status(200).send('“Cyberspace. A consensual hallucination experienced daily by billions of legitimate operators, \
    in every nation, by children being taught mathematical concepts... A graphic representation of data abstracted from banks \
    of every computer in the human system. Unthinkable complexity. Lines of light ranged in the nonspace of the mind, clusters \
    and constellations of data. Like city lights, receding...”\
    - William Gibson, Neuromancer.')
});

module.exports = router;
