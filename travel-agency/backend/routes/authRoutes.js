const express = require('express');
const router = express.Router();
const {
    register,
    login,
    forgotPassword,
    passwordReset
} = require('../handlers/userHandler');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', passwordReset);

module.exports = router;