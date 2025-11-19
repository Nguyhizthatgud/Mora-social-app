import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import { protectedRoute } from './middleware/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // req body parser 
app.use(cookieParser()); //cookie parser

// CORS configuration for production
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:4173'
].filter(Boolean);

app.use(cors({
    origin: 'https://m0ra.netlify.app',
    credentials: true
}));

app.use(express.urlencoded({ extended: true })); // form data parser

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'MORA backend is running',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Public routes (after middleware)
app.use("/api/auth", authRoutes);

// Private routes (after middleware)
app.use(protectedRoute);
app.use("/api/users", authRoutes);
connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});   