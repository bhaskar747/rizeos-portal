// server/models/Job.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    // --- FIX IS HERE: Standardize on the name 'author' ---
    author: { // Renamed from 'postedBy' for clarity and convention
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
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
    location: {
        type: String,
        required: true,
        default: 'Remote'
    },
    paymentTx: {
        type: String,
        required: true,
        unique: true, // This is excellent for preventing duplicate payments
    },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
