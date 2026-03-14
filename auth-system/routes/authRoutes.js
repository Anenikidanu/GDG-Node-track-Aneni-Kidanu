import express from 'express';
import { signup, login, logout, protect, dashboard } from '../controllers/authController.js';

const router = express.Router();

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/dashboard', protect, dashboard);

export default router;
