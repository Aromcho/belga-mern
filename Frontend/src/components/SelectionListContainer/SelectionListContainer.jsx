import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'react-bootstrap';
import SelectionList from '../SelectionList/SelectionList';
import axios from 'axios';
//import './ItemListContainer.css';

const SelectionListContainer = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/api/properties');
        // Limitar a solo 2 propiedades
        setProperties(response.data.objects.slice(0, 2));
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
    <Container className="selection-list-container">
      <SelectionList properties={properties} />
    </Container>
  );
};

export default SelectionListContainer;
