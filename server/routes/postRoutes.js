const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createPost).get(protect, getPosts);
router.route('/:id/like').put(protect, likePost);

module.exports = router;
