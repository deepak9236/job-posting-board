import express from 'express';
import { registerCompany, loginCompany } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerCompany);


router.post('/login', loginCompany);

export default router;
