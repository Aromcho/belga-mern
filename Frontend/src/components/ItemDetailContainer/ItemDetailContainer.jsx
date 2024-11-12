import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import { Skeleton } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async'; // Cambia a react-helmet-async

const ItemDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estado inicial: usa la propiedad si viene en el state
  const [property, setProperty] = useState(location.state?.property || null);
  const [loading, setLoading] = useState(!location.state?.property);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Esto asegura que cada vez que se cambie de propiedad, haga scroll al inicio

  useEffect(() => {
    // Si no hay datos de la propiedad en el state, carga del backend
    if (!property || property.id !== parseInt(id)) {
      const fetchProperty = async () => {
        setLoading(true); // Mostrar loading al iniciar nueva carga
        try {
          const response = await fetch(`/api/property/${id}`);
          const data = await response.json();

          if (response.ok) {
            setProperty(data);
          } else {
            setError('Propiedad no encontrada');
          }
        } catch (error) {
          setError('Error al cargar la propiedad');
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [id, property]);

  const planos = property?.photos?.filter(photo => photo.is_blueprint) || [];

  if (loading) {
    return (
      <div className='cargando mt-5 pt-5'>
        <Container className="my-5 text-dark property-detail">
        <Skeleton variant="text" width={200} height={40} />
        
        <Row>
          <Col md={6}>
            <Skeleton variant="text" width="100%" height={30} className="mb-2" />
            <Skeleton variant="text" width="80%" height={30} className="mb-2" />
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="rectangular" width="100%" height={300} className="my-4" />
          </Col>
          <Col md={6}>
            <Skeleton variant="text" width="100%" height={150} className="my-4" />
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <p>{error}. Volviendo a la lista de propiedades...</p>
        <button onClick={() => navigate(-1)}>Volver a la lista</button>
      </div>
    );
  }

  return (
    <div className="item-detail-container pt-5">
      <Helmet>
        <title>{property.address} | Belga Inmobiliaria</title>
        <meta property="og:title" content={`${property.publication_title} - ${property.address}`} />
        <meta property="og:description" content={`Descubre esta propiedad en ${property.address}. Haz clic para ver detalles y más fotos.`} />
        <meta property="og:image" content={property.photos[0]?.image || 'https://belga.com.ar/default-image.jpg'} />
        <meta property="og:url" content={`http://belga.com.ar:8080/propiedad/${property.id}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <ItemDetail property={property} planos={planos} />
    </div>
  );
};

export default ItemDetailContainer;
