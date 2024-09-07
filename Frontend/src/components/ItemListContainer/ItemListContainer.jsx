import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'react-bootstrap';
import ItemList from '../ItemList/ItemList';
import axios from 'axios';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/api/properties');
        setProperties(response.data.objects);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="loading-container text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Cargando propiedades...</p>
      </div>
    );
  }

  return (
    <Container className="item-list-container">
      <ItemList properties={properties} />
    </Container>
  );
};

export default ItemListContainer;
