import express from 'express';
import { completeProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getMe } from '../controllers/userController.js';
import { updateDonorStatus } from '../controllers/userController.js';

// import {authMiddleware} from '../middleware/authMiddleware.js';

const router = express.Router();

//complete user profile

router.post('/complete-profile', protect, completeProfile);
router.get("/me", protect, getMe);
router.patch("/donor-status", protect, updateDonorStatus);


export default router;
