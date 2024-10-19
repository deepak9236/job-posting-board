import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/verification', verificationRoutes);


app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
