import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUserRole,
} from '../controllers/authController.js';
import { protect, requireAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected user routes
router.get('/profile', protect, getUserProfile);

// Admin-only routes
router.get('/users', protect, requireAdmin, getAllUsers);
router.put('/users/:id/role', protect, requireAdmin, updateUserRole);

export default router;
