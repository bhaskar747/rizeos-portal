// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// server/controllers/authController.js

// ... (keep the other functions like registerUser, getUserProfile, etc.)

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });

        // If no user is found, return an error immediately
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If user is found, then compare the password
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return an error
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If everything is correct, send back user data and token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ... (keep the other functions)

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.bio = req.body.bio || user.bio;
            user.linkedinUrl = req.body.linkedinUrl || user.linkedinUrl;
            user.skills = req.body.skills || user.skills;
            user.walletAddress = req.body.walletAddress || user.walletAddress;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                bio: updatedUser.bio,
                linkedinUrl: updatedUser.linkedinUrl,
                skills: updatedUser.skills,
                walletAddress: updatedUser.walletAddress,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
