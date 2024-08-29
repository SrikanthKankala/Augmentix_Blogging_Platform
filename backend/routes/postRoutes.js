// C:\blogging-platform\backend\routes\postRoutes.js

const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
