import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const location = useLocation();
  const { property } = location.state; // Recibir la propiedad del estado

  // Si no hay datos de propiedad, mostrar un mensaje de error o cargar algo por defecto
  if (!property) {
    return <p>Error: No se encontró la propiedad.</p>;
  }

  return (
    <Container className="item-detail-container pt-5">
      <ItemDetail property={property} />
    </Container>
  );
};

export default ItemDetailContainer;
