// C:\blogging-platform\frontend\src\App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/create" element={<PostForm />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
