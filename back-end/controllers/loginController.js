const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userSchema');
require('dotenv').config();


// Send password reset email
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetToken = resetToken;
    console.log(resetToken)
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
    
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    });

    res.json({ message: 'Password reset link sent',resetLink: resetLink });
  } catch (err) {
    next(err); // Forward error to errorHandler middleware
  }
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const user = req.user; // User is attached by validateToken middleware
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    //next(err); // Forward error to errorHandler middleware
    res.status(500).json({ error: 'Server error' });
  }
};
