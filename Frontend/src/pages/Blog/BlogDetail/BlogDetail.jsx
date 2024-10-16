import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articule/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el artículo:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!article) {
    return <div>Artículo no encontrado</div>;
  }

  return (
    <div className="blog-detail-container mt-5 pt-5">
      <div className="blog-detail-images">
        {article.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Imagen ${index + 1}`} className="blog-detail-img" />
        ))}
      </div>
      <h1>{article.title}</h1>
      <h6 className="subtitle">{article.subtitle}</h6>
      <p className="date">Fecha: {new Date(article.createdAt).toLocaleDateString()}</p>
      <p className="author">Publicado por Belga Inmobiliaria</p>

      {/* Usamos dangerouslySetInnerHTML para renderizar el HTML */}
      <div dangerouslySetInnerHTML={{ __html: article.description }} />
    </div>
  );
};

export default BlogDetail;
