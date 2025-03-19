require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the pos server');
});

// Routes
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/category', require('./src/routes/categoryRoutes'));
app.use('/api/customerProduct', require('./src/routes/customerProductRoutes'));

// Server start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
