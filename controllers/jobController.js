import Job from '../models/jobModel.js';
import sendEmail from '../utils/emailService.js';

// Send job alert to candidates
export const sendJobAlert = async (req, res) => {
    const { jobId, candidates } = req.body;

    try {
        // Find the job by ID
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Email content
        const message = `
            <h1>Job Alert</h1>
            <p>We are excited to inform you about a job opening for the position of <strong>${job.title}</strong>.</p>
            <p><strong>Job Description:</strong> ${job.description}</p>
            <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
            <p>Regards,<br>${req.company.name}</p>
        `;

        // Send emails to all candidates
        await Promise.all(
            candidates.map(async (candidateEmail) => {
                await sendEmail({
                    email: candidateEmail,
                    subject: `Job Alert: ${job.title}`,
                    html: message,
                });
            })
        );

        // Update job with candidates
        job.candidates = [...new Set([...job.candidates, ...candidates])]; // Prevent duplicates
        await job.save();

        res.status(200).json({ message: 'Job alerts sent successfully!' });
    } catch (error) {
        console.error('Error sending job alerts:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};



// @desc    Post a new job
// @route   POST /api/jobs/post
// @access  Private (only verified companies)
export const postJob = async (req, res) => {
    const { title, description, experienceLevel, endDate } = req.body;

    try {
        // Check if all required fields are provided
        if (!title || !description || !experienceLevel || !endDate) {
            return res.status(400).json({ message: 'Please provide all job details.' });
        }

        // Create a new job
        const job = await Job.create({
            title,
            description,
            experienceLevel,
            endDate,
            company: req.company._id, // Add the company ID from the authenticated user
        });

        res.status(201).json({
            message: 'Job posted successfully!',
            job,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
