const express = require('express');
const firebase = require('../config.js');
const util = require('../util.js');
const router = express.Router();

router.get('/', function(req, res, next) {

    // TODO: Check session cookie to see if there is a known user at /index
    //        - if so then show a 'dashboard' option, rather than the signup
    //          option in the navbar
    res.render('index');
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
