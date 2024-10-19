import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Company from '../models/companyModel.js';
import sendEmail from '../utils/emailService.js';
import twilio from 'twilio';

// Company Registration
export const registerCompany = async (req, res) => {
    const { name, email, password, mobile } = req.body;

    try {
        // Check if the email already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const hashedPassword = password;
        const otpEmail = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        const otpMobile = Math.floor(100000 + Math.random() * 900000).toString();

        const company = new Company({
            name,
            email,
            password: hashedPassword,
            mobile,
            emailOtp: otpEmail,
            mobileOtp: otpMobile,
        });

        await company.save();

        // Send OTPs
        await sendEmail({
            email: company.email,
            subject: 'Your OTP for Email Verification',
            message: `Your OTP for email verification is: ${otpEmail}`,
        });

        // Use Twilio to send SMS OTP (for mobile)
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        console.log(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);
        await client.messages.create({
            to: company.mobile,
            from: process.env.TWILIO_PHONE_NUMBER,
            body: `Your OTP for mobile verification is: ${otpMobile}`,
        });

        res.status(201).json({ success: true, message: 'Registration successful! Please verify your email and mobile.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Company Login
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password );

    try {
        // Check if the company exists
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, company.password);
        console.log(password, company.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If company is not verified, navigate to OTP verification
        if (!company.isVerified) {
            return res.json({
                success: false,
                message: 'Company not verified. Redirect to OTP verification.',
                email: company.email,
                mobile: company.mobile,  // Send the mobile number to the frontend
            });
        }

        // Generate JWT for verified users
        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token and company data
        res.json({
            token,
            company: {
                id: company._id,
                name: company.name,
                email: company.email,
                mobile: company.mobile,
            },
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error in login' });
    }
};

