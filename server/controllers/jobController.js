

const Job = require('../models/Job');



exports.createJob = async (req, res) => {
    
    console.log("Backend received /jobs/create request with body:", req.body);
    console.log("Authenticated user ID from middleware:", req.user.id);

    // Destructure all required fields from the request body
    const { title, description, skills, budget, location, transactionSignature } = req.body;

    // Optional: Server-side validation of the transaction signature
    /* 
    const isConfirmed = await confirmTransaction(transactionSignature);
    if (!isConfirmed) {
        return res.status(400).json({ message: 'Payment transaction failed or could not be verified on-chain.' });
    }
    */
    
    
    const job = new Job({
        title,
        description,
        skills,
        budget,
        location,
        author: req.user.id,        // The schema expects 'author', not 'postedBy'
        paymentTx: transactionSignature // The schema expects 'paymentTx'
    });

    try {
        const savedJob = await job.save();
        // Populate the author's name before sending the response back
        const populatedJob = await Job.findById(savedJob._id).populate('author', 'name');
        res.status(201).json(populatedJob);

    } catch (error) {
        // Provide more specific error feedback
        console.error("Error saving job to database:", error);
        if (error.code === 11000) { 
            return res.status(400).json({ message: 'This payment transaction has already been used for another job posting.' });
        }
        res.status(500).json({ message: 'Server error while creating job post.', error: error.message });
    }
};


exports.getJobs = async (req, res) => {
    try {
        const { location, q } = req.query; 
        const filter = {};

        if (location) {
            filter.location = { $regex: new RegExp(location, 'i') };
        }

        if (q) {
            const searchQuery = { $regex: new RegExp(q, 'i') };
            filter.$or = [
                { title: searchQuery },
                { skills: searchQuery }
            ];
        }

        const jobs = await Job.find(filter)
            
            .populate('author', 'name') // Use 'author', not 'postedBy'
            .sort({ createdAt: -1 });
            
        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs.', error });
    }
};
