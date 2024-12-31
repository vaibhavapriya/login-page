const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/loginRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
//app.use(cors()); // Use CORS middleware
app.use(cors({
    origin: 'https://login-page-6789.onrender.com',
  }));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
