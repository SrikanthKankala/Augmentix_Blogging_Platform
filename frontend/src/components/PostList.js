// C:\blogging-platform\frontend\src\components\PostList.js






import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postService from '../services/postService';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await postService.getPosts();

                // Sort posts by creation time
                const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };
        fetchPosts();
    }, []);

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await postService.deletePost(id);
                setPosts(posts.filter(post => post._id !== id)); // Update the state to remove the deleted post
            } catch (error) {
                console.error('Failed to delete post:', error);
            }
        }
    };

    return (
        <div className="post-list-container">
            <h1>Blog Posts Lists</h1>
            <Link to="/create" className="create-post-link">Create New Post</Link>
            {posts.map((post) => (
                <div key={post._id} className="post-item">
                    <div className="post-title">{post.title}</div>
                    <div className="post-content">{post.content}</div>
                    <div className="post-date">Created on: {formatDate(post.createdAt)}</div>
                    <div className="post-actions">
                        <Link to={`/edit/${post._id}`} className="post-action-link"><FaEdit /></Link>
                        <button onClick={() => handleDelete(post._id)} className="post-action-button"><FaTrash /></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
