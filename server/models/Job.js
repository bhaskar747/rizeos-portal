const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    // This is the new field for job location
    location: {
        type: String,
        required: true,
        default: 'Remote'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    paymentTx: {
        type: String,
        required: true,
        unique: true, // Ensures one transaction cannot be used for multiple jobs
    },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
