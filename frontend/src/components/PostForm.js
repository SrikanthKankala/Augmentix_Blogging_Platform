// C:\blogging-platform\frontend\src\components\PostForm.js





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postService from '../services/postService';
import './PostForm.css';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(''); // To hold validation errors
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate fields
        if (!title || !content) {
            setError('Title and content are required.');
            return;
        }
        
        try {
            await postService.createPost({ title, content });
            navigate('/');
        } catch (error) {
            setError('Failed to create post.');
        }
    };

    return (
        <div className="post-form-container">
            <h1>Create Post</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default PostForm;
