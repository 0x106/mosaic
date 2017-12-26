const express = require('express');
const firebase = require('../../config.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
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

// TODO: move this into its own file (users.js?)
router.get('/dashboard', (req, res) => {

  // get the currently signed in user and then render their data
  // if no user is currently signed in then send them to the login page res.render('signup')

  firebase.auth().onAuthStateChanged(function(user) {
      if(user) { // if there is a currently signed in user
        res.render('dashboard', {username: 'logged in'});
      } else {
         res.render('signup');
      }
  });
  // res.render('dashboard');
});

router.get('/newScene', (req, res) => {
  res.render('newScene');
});

module.exports = router;
