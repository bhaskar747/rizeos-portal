// server/routes/jobs.js
const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createJob);
router.get('/', getJobs);

module.exports = router;
