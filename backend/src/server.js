import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import bookmarkRoutes from './routes/bookmarks.js';
import cors from 'cors';

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // All HTTP methods
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ], // Common headers
  exposedHeaders: ['Set-Cookie'], // Allow frontend to access Set-Cookie header
  optionsSuccessStatus: 200, // For legacy browser support
  preflightContinue: false // Handle preflight requests automatically
}));


// routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
