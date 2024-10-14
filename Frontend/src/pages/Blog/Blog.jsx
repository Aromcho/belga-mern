import React from 'react';
import ItemListBlog from './ItemListBlog/ItemListBlog.jsx';
import './Blog.css';

const Blog = () => {
    return (
        <div className='blog-container mt-5 pt-5'>
            <ItemListBlog />
        </div>
    );
};

export default Blog;