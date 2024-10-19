import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: ['Fresher', 'Mid-level', 'Senior'],
    },
    endDate: {
        type: Date,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    candidates: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
