// server/controllers/aiController.js
const aiService = require('../services/aiService');
const User = require('../models/User');

exports.extractSkills = (req, res) => {
    const { bio } = req.body;
    if (!bio) {
        return res.status(400).json({ message: 'Bio text is required.' });
    }
    const skills = aiService.extractSkillsFromBio(bio);
    res.json({ skills });
};

exports.getMatchScore = async (req, res) => {
    const { jobSkills } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || !jobSkills) {
        return res.status(400).json({ message: 'User profile and job skills are required.' });
    }

    const score = aiService.calculateMatchScore(jobSkills, user.skills);
    res.json({ matchScore: score });
};
