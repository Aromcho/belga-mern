import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemBlog from '../ItemBlog/ItemBlog';
import Titulares from '../Titulares/Titulares';
import { Container, Row, Col } from 'react-bootstrap'; // Importamos Container, Row, Col para la estructura
import './ItemListBlog.css';

const ItemListBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articule');
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Error al obtener los artículos:', error);
      } finally {
        setIsLoading(false); // Cambiamos el estado de carga a falso después de intentar obtener los datos
      }
    };
    fetchArticles();
  }, []);

  return (
    <Container className="blog-list-container">
      <Row>
        {/* Slider de Titulares ocupando dos columnas en pantallas grandes */}
        <Col md={8} xs={12} className="titulares-container mb-4">
          <Titulares />
        </Col>

        {/* Mostrar skeletons mientras los datos están cargando */}
        {(isLoading ? Array.from(new Array(6)) : blogPosts).map((post, index) => (
          <Col md={4} xs={6} className="mb-4 blog-post-item" key={post?._id || index}>
            <ItemBlog
              id={post?._id}
              title={post?.title}
              subtitle={post?.subtitle}
              date={post ? new Date(post.createdAt).toLocaleDateString() : ''}
              imageUrl={post?.photos ? post.photos[0] : ''}
              summary={post?.summary}
              isLoading={isLoading} // Pasar el estado de carga al componente ItemBlog
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemListBlog;