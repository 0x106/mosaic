const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// a new user sign up
router.post('/', function(req, res, next) {
    res.status(200)//.send(`{req.username}`)
});

module.exports = router;
