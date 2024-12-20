const express = require('express');
const { forgotPassword,  resetPassword } = require('../controllers/loginController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

// POST: Send password reset email
router.post('/forgot-password', forgotPassword);

//POST: Reset password (uses validateToken middleware)
router.post('/reset-password/:token', validateToken, resetPassword);


// POST: Reset password
//router.post('/reset-password/:token', resetPassword);




module.exports = router;
