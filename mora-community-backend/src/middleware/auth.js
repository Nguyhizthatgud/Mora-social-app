import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
    try {
        //get token from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: 'Not authorized or access token missing' });
        }

        // verify with the SAME secret used to sign (JWT_SECRET)
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);
                return res.status(401).json({ message: 'Not authorized or token invalid' });
            }
            // find user by id
            const user = await User.findById(decoded.id).select('-passwordHash'); // Attach user to request
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // return req user  
            req.user = user;
            next(); // Pass control to next handler (getMe)
        });
    } catch (error) {
        console.error("Middleware error:", error);
        return res.status(500).json({ message: 'Server error in auth middleware' });
    }
};