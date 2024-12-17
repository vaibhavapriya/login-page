const User = require('../models/user');

// Middleware to validate reset token
const validateToken = async (req, res, next) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = validateToken;

