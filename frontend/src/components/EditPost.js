// C:\blogging-platform\frontend\src\components\EditPost.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postService from '../services/postService';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const data = await postService.getPost(id);
            setTitle(data.title);
            setContent(data.content);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postService.updatePost(id, { title, content });
        navigate(`/post/${id}`);
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditPost;
