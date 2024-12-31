const express = require('express');
const { forgotPassword,  resetPassword } = require('../controllers/loginController');
const { login, signup, logout} = require('../controllers/userLoginController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.post('/logout', logout)

// POST: Send password reset email
router.post('/forgot-password', forgotPassword);

//POST: Reset password (uses validateToken middleware)
router.post('/reset-password/:token', validateToken, resetPassword);


// POST: Reset password
//router.post('/reset-password/:token', resetPassword);




module.exports = router;
