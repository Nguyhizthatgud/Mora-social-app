import { User } from '../models/User.js';
import Session from '../models/Session.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const ACCESS_TOKEN_TIME_TO_SAY_GOODBYE = '35m';
// 14 days in milliseconds (for cookies and DB expiresAt)
const REFRESH_TOKEN_TIME_TO_SAY_GOODBYE = 14 * 24 * 60 * 60 * 1000;
// Generate JWT Token dead by 35m  
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_TIME_TO_SAY_GOODBYE,
    });
};
// Generate a random refresh token string (rotate per-login)
const generateRefreshToken = () => crypto.randomBytes(64).toString('hex');


// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    try {
        // check if user value blank 
        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }
        // Check if user exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //hashed password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log('Creating user with data:', { username, email, displayName: `${firstName} ${lastName}` });

        // Create user
        const user = await User.create({
            username,
            email,
            passwordHash: hashedPassword,  // Match the schema field name
            displayName: `${firstName} ${lastName}`,
        });

        console.log('User saved to database:', { id: user._id, username: user.username });

        if (user) {
            res.status(201).json({
                _id: user._id,  // Include ID so you can verify in MongoDB
                username: user.username,
                email: user.email,
                displayName: user.displayName,
            });
        }
    } catch (error) {
        console.error("signup error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        // get input
        const { username, password } = req.body;

        // findz user (include password for comparison)
        const user = await User.findOne({ username });
        const comparePassword = await bcrypt.compare(password, user.passwordHash);
        // compare password with hashed one
        if (!user || !comparePassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // if its good, generate access token by jwt
        const accessToken = generateToken(user._id);

        // create session and store refresh token
        const refreshToken = generateRefreshToken();
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TIME_TO_SAY_GOODBYE),
        });

        // send back refresh token through cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, //no javascript access
            secure: process.env.NODE_ENV === 'production', // secure only in prod
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // None required for cross-origin
            maxAge: REFRESH_TOKEN_TIME_TO_SAY_GOODBYE,
        });
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken,
            // Optionally return refreshToken too (usually avoid sending in body)
        });
    } catch (error) {
        console.error("login error:", error);
        res.status(500).json({ message: error.message });
    }
};
// @desc    Log out user
// @route   POST /api/auth/logout
// @access  Public
export const logOut = async (req, res) => {
    try {
        // get refresh token from cookies
        const token = req.cookies?.refreshToken;
        if (token) {
            // delete session from db
            await Session.findOneAndDelete({ refreshToken: token });
            // clear cookie 
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            });
        }
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        console.error("logout error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Exchange refresh token (cookie) for a new access token (and rotate refresh)
// @route   POST /api/auth/refresh
// @access  Public (uses httpOnly cookie)
export const refreshToken = async (req, res) => {
    try {
        // get refresh token from cookies
        const existingToken = req.cookies?.refreshToken;
        console.log('Refresh attempt - Cookie present:', !!existingToken);

        // if it's missing
        if (!existingToken) {
            return res.status(401).json({ message: 'Refresh token missing from cookies' });
        }

        // find refresh token in db
        const session = await Session.findOne({ refreshToken: existingToken });
        console.log('Session found:', !!session);

        if (!session) {
            return res.status(401).json({ message: 'Invalid refresh token - session not found' });
        }

        // check if expired
        if (session.expiresAt < new Date()) {
            console.log('Session expired');
            // cleanup expired session
            await Session.deleteOne({ _id: session._id });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            });
            return res.status(401).json({ message: 'Refresh token expired' });
        }

        // Check JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error('FATAL: JWT_SECRET not set in environment');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // issue new access token (use same claim 'id' as login)
        const accessToken = jwt.sign(
            { id: session.userId },
            process.env.JWT_SECRET,
            { expiresIn: ACCESS_TOKEN_TIME_TO_SAY_GOODBYE }
        );

        console.log('Access token generated successfully');
        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Refresh token error:', error.message, error.stack);
        return res.status(500).json({ message: error.message });
    }
};
// @desc    Get current user or user by username
// @route   GET /api/auth/me
// @route   GET /api/auth/user/:username
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = req.user; // set in protectedRoute middleware
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
