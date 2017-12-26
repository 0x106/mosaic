const express = require('express');
const firebase = require('../config.js');
const router = express.Router();

router.get('/', (req, res) => {
  // check if the user is logged in and if so then redirect to the dashboard

  // TODO: this won't do anything at the moment until we set the persistence level
  firebase.auth().onAuthStateChanged(function(user) {
      if(user) { // if there is a currently signed in user
        // res.render('dashboard', {username: 'logged in (index)'});
        res.redirect('https://www.atlasreality.xyz/auth/dashboard')
      } else {
         res.render('index');
      }
  });
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

// router.get('/newScene', (req, res) => {
//   res.render('newScene');
// });

module.exports = router;
