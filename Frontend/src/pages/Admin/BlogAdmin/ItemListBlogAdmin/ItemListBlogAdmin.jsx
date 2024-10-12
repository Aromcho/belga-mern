import React from 'react';
import ItemBlogAdmin from '../ItemBlogAdmin/ItemBlogAdmin';
import AddCard from '../AddCard/AddCard';

const ItemListBlogAdmin = () => {
  const blogPosts = [
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://impulsapopular.com/wp-content/uploads/2021/08/4984-Pasos-para-crear-una-empresa-o-agencia-inmobiliaria-.jpg',
    },
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://impulsapopular.com/wp-content/uploads/2021/08/4984-Pasos-para-crear-una-empresa-o-agencia-inmobiliaria-.jpg',
    },
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://impulsapopular.com/wp-content/uploads/2021/08/4984-Pasos-para-crear-una-empresa-o-agencia-inmobiliaria-.jpg',
    },
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://impulsapopular.com/wp-content/uploads/2021/08/4984-Pasos-para-crear-una-empresa-o-agencia-inmobiliaria-.jpg',
    },
    {
      title: 'Impacto en el mercado inmobiliario por la baja del dólar.',
      date: '15/20/2024',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div className="row blog-posts-list">
       <div className="col-md-4 mb-4">
        <AddCard />  {/* Aquí se muestra la tarjeta de "Agregar" */}
      </div>
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
