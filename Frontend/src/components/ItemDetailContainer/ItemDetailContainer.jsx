import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import axios from 'axios';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const { propertyId } = useParams();  // Obtén el id de la propiedad desde la URL
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/api/${propertyId}`);
        setProperty(response.data);  // Guarda los datos de la propiedad en el estado
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProperty();  // Llama a la API cuando el componente se monta
  }, [propertyId]);

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  if (!property) {
    return (
      <div className="loading-container text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Cargando propiedad...</p>
      </div>
    );
  }

  // Pasamos los datos de la propiedad a `ItemDetail` a través de `props`
  return (
    <Container className="item-detail-container pt-5">
      <ItemDetail property={property} />
    </Container>
  );
};

export default ItemDetailContainer;
