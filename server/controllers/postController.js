const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Post content cannot be empty.' });
    }
    const post = new Post({
        content,
        author: req.user.id,
    });
    try {
        const savedPost = await post.save();
        await savedPost.populate('author', 'name');
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post.', error });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts.', error });
    }
};

// Like or unlike a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        const userId = req.user.id;
        if (post.likes.includes(userId)) {
            // User has already liked, so unlike
            post.likes.pull(userId);
        } else {
            // User has not liked, so like
            post.likes.push(userId);
        }
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post likes.', error });
    }
};
