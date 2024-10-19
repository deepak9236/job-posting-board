import jwt from 'jsonwebtoken';
import Company from '../models/companyModel.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the company by ID
            req.company = await Company.findById(decoded.id).select('-password');

            // Check if the company is verified
            if (!req.company.isVerified) {
                return res.status(403).json({ message: 'Please verify your email to post jobs.' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
