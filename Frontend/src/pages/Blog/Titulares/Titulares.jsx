import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import './Titulares.css';

const Titulares = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articule'); // Ruta de tu API
        setArticles(response.data); // Guardamos los artículos obtenidos
      } catch (error) {
        console.error('Error al obtener los artículos:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="titulares">
      <Carousel
        activeIndex={activeIndex}
        onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
        interval={5000} // Cambiará cada 5 segundos
        indicators={false} // Para ocultar los indicadores de puntos
  controls={false} // Para ocultar las flechas
      >
        {articles.map((article, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 titulares-img"
              src={article.photos[0]} // Usar la primera imagen
              alt={article.title}
            />
            <div className="image-overlay"></div>
            <Carousel.Caption className="caption-bg">
              <h3>{article.title}</h3>
              <p className='subtitle-titulares'>{article.subtitle}</p>
              <small>{new Date(article.createdAt).toLocaleDateString()}</small>
              <span> {article.author} </span>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Titulares;
