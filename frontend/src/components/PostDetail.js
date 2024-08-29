// C:\blogging-platform\frontend\src\components\PostDetail.js



import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import postService from '../services/postService';
import './PostDetail.css';


const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const data = await postService.getPost(id);
            setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        await postService.deletePost(id);
        navigate('/');
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="post-detail-container">
            <h1>Post Details</h1>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-content">{post.content}</p>
            
            <Link to="/" className="back-to-posts-link">Back to Posts</Link>
        </div>
    );
};

export default PostDetail;
