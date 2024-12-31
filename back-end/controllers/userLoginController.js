const User = require("../models/userSchema")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
let blacklistedTokens = []; 

exports.login = async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }
        if ( !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        const userId=user._id;
        res.status(200).json({ token, id: userId });
    } catch (error) {
        console.error("Server Error: ", error.message);
        res.status(500).json({ error: error.message });
    }
};

// User Signup
exports.signup = async (req, res) => {
    try {
      const {name, email, password } = req.body;
      console.log(req.body);
  
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
      console.log(userExists);
      const newUser = new User({ name, email, password });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Token missing' });
    }
    // Add the token to a blacklist (if using one)
    blacklistedTokens.push(token); // Example array for blacklisting
    res.status(200).json({ message: 'Logged out successfully' });
};