import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config, mongooseOptions } from './config/config.js';
import authRoutes from './routes/auth.js';
import imageRoutes from './routes/images.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PixelMind API' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, mongooseOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    if (err.name === 'MongoServerSelectionError') {
      console.error('Could not connect to MongoDB server.');
      console.error('Please check:');
      console.error('1. Your MongoDB connection string is correct');
      console.error('2. Network connectivity to the MongoDB server');
      console.error('3. MongoDB Atlas cluster is running and accessible');
    }
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Connect to database before starting the server
connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log('OpenAI API Key type:', config.openai.isProjectKey ? 'Project-specific' : 'Standard');
  });
});