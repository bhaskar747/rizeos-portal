const Job = require('../models/Job');
const { confirmTransaction } = require('../services/solanaService');

// Create a new job, now including location
exports.createJob = async (req, res) => {
    // Destructure all required fields from the request body
    const { title, description, skills, budget, location, transactionSignature } = req.body;

    const isConfirmed = await confirmTransaction(transactionSignature);

    if (!isConfirmed) {
        return res.status(400).json({ message: 'Payment transaction failed or could not be verified on-chain.' });
    }

    const job = new Job({
        title,
        description,
        skills,
        budget,
        location, // Save the new location field
        postedBy: req.user.id,
        paymentTx: transactionSignature
    });

    try {
        const savedJob = await job.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: 'Error creating job post. The transaction may have already been used.', error });
    }
};

// Get jobs, now with filtering capabilities
exports.getJobs = async (req, res) => {
    try {
        // Get filter criteria from the query string (e.g., /api/jobs?location=Remote)
        const { location, q } = req.query; 

        // Start with an empty filter object
        const filter = {};

        // If a location is provided in the query, add it to the filter
        if (location) {
            // Use a case-insensitive regex for better matching
            filter.location = { $regex: new RegExp(location, 'i') };
        }

        // If a search query 'q' is provided, search title and skills
        if (q) {
            const searchQuery = { $regex: new RegExp(q, 'i') };
            filter.$or = [
                { title: searchQuery },
                { skills: searchQuery }
            ];
        }

        // Find jobs using the constructed filter object
        const jobs = await Job.find(filter)
            .populate('postedBy', 'name')
            .sort({ createdAt: -1 });
            
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs.', error });
    }
};
