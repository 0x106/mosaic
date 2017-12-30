const express = require('express');
const firebase = require('../config.js');
const router = express.Router();

router.get('/', function(req, res, next) {
    if (req.__session && req.__session.user) {
      res.render('index', {signUpButtonText: 'Dashboard'})
    } else {
      res.render('index', {signUpButtonText: 'Sign Up'});
    }
});

router.get('/signup', (req, res) => {
  if (req.__session && req.__session.user) {
    res.redirect('/auth/dashboard')
  } else {
    res.render('signup');
  }
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
