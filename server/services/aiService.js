// server/services/aiService.js
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// FINAL FIX: Greatly expanded keyword list for more accurate extraction
const SKILL_KEYWORDS = [
    // Languages
    'javascript', 'typescript', 'python', 'java', 'c#', 'c++', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'sql', 'html', 'css',
    // Frontend
    'react', 'react.js', 'angular', 'vue', 'vue.js', 'svelte', 'jquery', 'bootstrap', 'tailwind css', 'sass', 'less', 'webpack', 'vite', 'next.js', 'gatsby', 'frontend',
    // Backend
    'node.js', 'express', 'express.js', 'django', 'flask', 'rails', 'laravel', 'spring boot', 'asp.net', 'backend',
    // Database
    'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis', 'oracle', 'microsoft sql server', 'firebase',
    // Web3 / Blockchain
    'web3', 'blockchain', 'solidity', 'ethers.js', 'web3.js', 'solana', '@solana/web3.js', 'rust (for solana)', 'smart contracts', 'metamask', 'phantom',
    // DevOps & Cloud
    'docker', 'kubernetes', 'aws', 'azure', 'google cloud', 'gcp', 'terraform', 'ansible', 'jenkins', 'git', 'github',
    // General & AI
    'nlp', 'natural language processing', 'ai', 'machine learning', 'data science', 'ui/ux', 'figma', 'rest api', 'graphql', 'web developer'
];

exports.extractSkillsFromBio = (bio) => {
    const text = bio.toLowerCase();
    // Improved tokenization to handle phrases and special characters
    const tokens = text.split(/[\s,.;:()]+/).filter(Boolean);
    const tokenSet = new Set(tokens);

    const extracted = SKILL_KEYWORDS.filter(skill => {
        // Handle multi-word skills (e.g., "tailwind css")
        if (skill.includes(' ')) {
            return text.includes(skill);
        }
        // Handle single-word skills
        return tokenSet.has(skill);
    });
    return [...new Set(extracted)]; // Return unique skills
};

exports.calculateMatchScore = (jobSkills, userSkills) => {
    if (!jobSkills || jobSkills.length === 0 || !userSkills || userSkills.length === 0) return 0;
    
    const jobSkillSet = new Set(jobSkills.map(s => s.toLowerCase()));
    const userSkillSet = new Set(userSkills.map(s => s.toLowerCase()));

    const intersection = new Set([...jobSkillSet].filter(skill => userSkillSet.has(skill)));
    const score = (intersection.size / jobSkillSet.size) * 100;
    
    return Math.round(score);
};
