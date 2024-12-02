import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemBlogAdmin from '../ItemBlogAdmin/ItemBlogAdmin';
import AddCard from '../AddCard/AddCard';

const ItemListBlogAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  // Función para obtener los artículos desde el backend
  const fetchArticles = async () => {
    try {
      const response = await axios.get('/api/articule'); // Ruta de tu API
      setBlogPosts(response.data); // Guardamos los artículos obtenidos
    } catch (error) {
      console.error('Error al obtener los artículos:', error);
    }
  };

  // Llamamos a la función fetchArticles al cargar el componente
  useEffect(() => {
    fetchArticles();
  }, []);

  // Función para manejar el borrado
  const handleDelete = (id) => {
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };

  return (
    <div className="row blog-posts-list">
      <div className="col-md-4 mb-4">
        <AddCard onAdd={fetchArticles} /> {/* Aquí se muestra la tarjeta de "Agregar" */}
      </div>
      {blogPosts.map((post, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <ItemBlogAdmin
            id={post._id}
            title={post.title}
            date={post.createdAt} // Asegúrate de ajustar la fecha según el formato de tu respuesta
            fakeDate={post.fakeDate} // Añadido para la fecha falsa
            imageUrl={post.photos[0]} // Si estás usando varias fotos, usa la primera
            onDelete={handleDelete} // Pasamos la función handleDelete para borrar
          />
        </div>
      ))}
    </div>
  );
};

export default ItemListBlogAdmin;
