import React from 'react';
import ItemBlogAdmin from '../ItemBlogAdmin/ItemBlogAdmin';

const ItemListBlogAdmin = () => {
  const blogPosts = [
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="row blog-posts-list">
      {blogPosts.map((post, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <ItemBlogAdmin 
            title={post.title} 
            date={post.date} 
            imageUrl={post.imageUrl} 
          />
        </div>
      ))}
    </div>
  );
};

export default ItemListBlogAdmin;
