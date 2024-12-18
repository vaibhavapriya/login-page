const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/loginRoutes');
const errorHandler = require('./middleware/errorHandler');
//const errorHandler = require('./middleware/validToken');
require('dotenv').config();
const cors = require('cors');
app.use(cors());


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRoutes);

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
