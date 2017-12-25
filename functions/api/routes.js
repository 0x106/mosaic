const express = require('express');
// const multer  = require('multer')
// const upload = multer({ dest: '../data/upload/' })
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
  res.render('dashboard');
});

router.get('/newScene', (req, res) => {
  res.render('newScene');
});

module.exports = router;
