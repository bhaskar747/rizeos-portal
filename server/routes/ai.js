// server/routes/ai.js
const express = require('express');
const router = express.Router();
const { extractSkills, getMatchScore } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/extract-skills', protect, extractSkills);
router.post('/match-score', protect, getMatchScore);

module.exports = router;
