import express from 'express';
import Company from '../models/companyModel.js';

const router = express.Router();

router.post('/verify-email', async (req, res) => {
    const { email, otp } = req.body;
    console.log(email, otp);
    try {
        const company = await Company.findOne({ email });

        if (!company) {
            return res.status(400).json({ message: 'Company not found' });
        }

        if (company.emailOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        company.isVerified = true;
        company.emailOtp = null; 
        await company.save();

        res.status(200).json({success: true, message: 'Email verified successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/verify-mobile', async (req, res) => {
    const { mobile, otp } = req.body;
    console.log(mobile,otp);
    try {
        const company = await Company.findOne({ mobile });

        if (!company) {
            return res.status(400).json({ message: 'Company not found' });
        }

        if (company.mobileOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        company.isVerified = true;
        company.mobileOtp = null; 
        await company.save();

        res.status(200).json({success: true, message: 'Mobile verified successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
