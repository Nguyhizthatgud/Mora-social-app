import express from 'express';
import { register, login, getMe, logOut, refreshToken } from '../controllers/authController.js';
import { protectedRoute } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logOut);
router.post('/refresh', refreshToken); // for refresh new access token
router.get('/me', protectedRoute, getMe);

export default router;