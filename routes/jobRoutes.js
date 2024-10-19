import express from 'express';
import { sendJobAlert, postJob } from '../controllers/jobController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to post a job (protected, only verified companies can post)
router.post('/', protect, postJob);

// Protected route for sending job alerts
router.post('/send-alert', protect, sendJobAlert);

// // Route to post a job (protected, only verified companies can post)
// router.post('/post', protect, postJob);

export default router;
