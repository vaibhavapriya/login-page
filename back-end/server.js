const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/loginRoutes');
const errorHandler = require('./middleware/errorHandler');
//const errorHandler = require('./middleware/validToken');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
