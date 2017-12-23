const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const authCore = require("authCore");

// a new user sign up
router.post('/',
  function(req, res, next) {
    res.status(200).send(`{req.body.username}`)
  }
);

module.exports = router;



// https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
