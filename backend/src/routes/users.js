const express = require('express');
const router = express.Router();

const {
    newUser
} = require('../controllers/users');

router.route('/').post(newUser);

module.exports = router;