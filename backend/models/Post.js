
// C:\blogging-platform\backend\models\Post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Blog_posts', postSchema);

module.exports = Post;
