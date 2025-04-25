const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/database');

// Initialize dotenv to read .env variables
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ CORS middleware — allow only frontend origin
app.use(cors({
  origin: 'http://localhost:3005',  // 👈 Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

// ✅ Register user routes
app.use('/api/users', userRoutes);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
