import React from 'react';
import ItemListBlog from './ItemListBlog/ItemListBlog';
import './Blog.css';

const Blog = () => {
    return (
        <div className='blog-container mt-5'>
            <img className='historias' src="https://yt3.googleusercontent.com/2F23aSbB-aytzdLLYpVk4nT0PCXReFZpivlm1mJtsGnIek4cvbpS0VabYiy1cSTULROIvVhLsEo=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="" />
            <ItemListBlog />
        </div>
    );
};

export default Blog;