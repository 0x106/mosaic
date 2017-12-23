const express = require('express');
const bcrypt = require('bcrypt');

const authCore = require("authCore");
const router = express.Router();

// a new user sign up
router.post('/',
  function(req, res, next) {
    res.status(200).send(`{req.body.username}`)
  }
);

module.exports = router;



// https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
