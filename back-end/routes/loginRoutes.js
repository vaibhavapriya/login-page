const express = require('express');
const { forgotPassword, validateToken, resetPassword } = require('../controllers/loginController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();

// POST: Send password reset email
router.post('/forgot-password', forgotPassword);

// POST: Reset password (uses validateToken middleware)
router.post('/reset-password/:token', validateToken, resetPassword);
// GET: Validate token
//router.get('/validate-reset/:token', validateToken);

// POST: Reset password
//router.post('/reset-password', resetPassword);




module.exports = router;
