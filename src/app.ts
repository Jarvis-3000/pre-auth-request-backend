import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import patientRoutes from './routes/patientRoutes';
import preAuthRequestRoutes from './routes/preAuthRequestRoutes';
import providerRoutes from './routes/providerRoutes';
import connectDB from './config/db';

// For loading environment variables from .env
dotenv.config();

// Create express app
const app: Application = express();

// Middlewares
// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  credentials: true, 
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/pre-auth-requests', preAuthRequestRoutes);
app.use('/api/provider', providerRoutes);

// 404 Error handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
