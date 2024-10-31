import React, { useState, useEffect } from 'react';
import { Spinner, Container } from 'react-bootstrap';
import SelectionList from '../SelectionList/SelectionList';
import axios from 'axios';

const SelectionListContainer = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/property/properties', {
          params: {
            order: 'desc', // Parámetro de orden descendente (ajusta si la API requiere otro nombre, como sortOrder o similar)
            limit: 2 // Si tu API permite limitar los resultados desde la solicitud
          }
        });
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
    <Container>
      <SelectionList properties={properties} />
    </Container>
  );
};

export default SelectionListContainer;
