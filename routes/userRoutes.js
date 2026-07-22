import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUserRole,
  requestPasswordReset,
  resetPassword
  // confirmEmail
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/',protect, admin, getAllUsers);
router.put('/:id/role', protect, admin, updateUserRole);
router.post('/reset', requestPasswordReset);
router.put('/reset/:token', resetPassword);
// router.get('/confirm/:token', confirmEmail);

export default router;
