import React from 'react';
import ItemBlog from '../ItemBlog/ItemBlog';
import './ItemListBlog.css';

const ItemListBlog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://via.placeholder.com/150',
      summary: 'Este artículo explora cómo la caída del dólar ha afectado el mercado inmobiliario en diferentes regiones.',
    },
    {
      id: 2,
      title: 'El crecimiento de las inversiones en propiedades.',
      date: '12/18/2024',
      imageUrl: 'https://via.placeholder.com/150',
      summary: 'Las inversiones inmobiliarias siguen creciendo a pesar de la incertidumbre económica global.',
    },
    {
      id: 3,
      title: 'Tendencias del mercado inmobiliario en 2024.',
      date: '11/10/2024',
      imageUrl: 'https://via.placeholder.com/150',
      summary: 'Conozca las principales tendencias del mercado inmobiliario en el año 2024.',
    },
  ];

  return (
    <div className="row blog-list">
      {blogPosts.map((post) => (
        <div className="col-md-4" key={post.id}>
          <ItemBlog
            title={post.title}
            date={post.date}
            imageUrl={post.imageUrl}
            summary={post.summary}
          />
        </div>
      ))}
    </div>
  );
};

export default ItemListBlog;
