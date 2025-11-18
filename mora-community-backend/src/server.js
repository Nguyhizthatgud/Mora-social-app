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
app.use(cors({
    origin: process.env.CLIENT_URL, // allow requests from this origin
    credentials: true, // allow cookies to be sent
}));
app.use(express.urlencoded({ extended: true })); // form data parser

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