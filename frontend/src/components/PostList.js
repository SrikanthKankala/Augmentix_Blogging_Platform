// // // C:\blogging-platform\frontend\src\components\PostList.js




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postService from '../services/postService';
import { FaEdit, FaTrash, FaGlobe } from 'react-icons/fa';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [visiblePostId, setVisiblePostId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [confirmationTitle, setConfirmationTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await postService.getPosts();
                const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDelete = async (id, title) => {
        if (confirmationTitle === title) {
            try {
                await postService.deletePost(id);
                setPosts(posts.filter(post => post._id !== id));
                setConfirmDeleteId(null);
                setConfirmationTitle('');
                setErrorMessage(''); // Clear error message on successful deletion
            } catch (error) {
                console.error('Failed to delete post:', error);
            }
        } else {
            setErrorMessage('Title does not match. Please enter the correct title.'); // Set error message when titles do not match
        }
    };

    const toggleActionsVisibility = (id) => {
        setVisiblePostId(visiblePostId === id ? null : id);
        setConfirmDeleteId(null); // Hide the delete confirmation when toggling actions visibility
    };

    const openConfirmationContainer = (id) => {
        setConfirmDeleteId(id);
        setVisiblePostId(null); // Hide the action buttons when opening delete confirmation
        setConfirmationTitle(''); // Reset the input field whenever a new confirmation is opened
        setErrorMessage(''); // Clear error message when opening a new confirmation
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
                    <div className="post-globe-icon" onClick={() => toggleActionsVisibility(post._id)}>
                        <FaGlobe />
                    </div>
                    {visiblePostId === post._id && (
                        <div className="post-actions">
                            <Link to={`/edit/${post._id}`} className="post-action-link"><FaEdit /></Link>
                            <button onClick={() => openConfirmationContainer(post._id)} className="post-action-button"><FaTrash /></button>
                        </div>
                    )}
                    {confirmDeleteId === post._id && (
                        <div className="delete-confirmation-container">
                            <p className="title_delete">
    Enter the Title of the post <span className="highlight-title">"{post.title}"</span> to confirm deletion:
</p>

                            <input
                                type="text"
                                value={confirmationTitle}
                                onChange={(e) => setConfirmationTitle(e.target.value)}
                                placeholder="Enter post title"
                                className="confirmation-input"
                            />
                            <button
                                onClick={() => handleDelete(post._id, post.title)}
                                className="confirm-delete-button"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="cancel-delete-button"
                            >
                                Cancel
                            </button>
                            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostList;
