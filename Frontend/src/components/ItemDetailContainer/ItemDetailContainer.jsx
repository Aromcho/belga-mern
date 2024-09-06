import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import axios from 'axios';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const { propertyId } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/${propertyId}`);
        setProperty(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProperty();
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

  return (
    <Container className="item-detail-container pt-5">
      <ItemDetail property={property} />
    </Container>
  );
};

export default ItemDetailContainer;
