import React from 'react';
import ItemListBlog from './ItemListBlog/ItemListBlog';

const Blog = () => {
    return (
        <div className='mt-5'>
            <h1  className='mt-5'>Blog Page</h1>
            <p  className='mt-5'>Welcome to the blog page!</p>
            <ItemListBlog />
        </div>
    );
};

export default Blog;