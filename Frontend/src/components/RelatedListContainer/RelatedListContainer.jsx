import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import RelatedList from '../RelatedList/RelatedList';
import axios from 'axios';

const RelatedListContainer = ({ id, price, location, propertyType }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProperties = async () => {
      try {
        // Realizamos la solicitud a la API de propiedades relacionadas
        const response = await axios.get(`/api/property/propertyDetail/${id}/related`, {
          params: {
            price,
            location,
            propertyType,
          },
        });
        // Limitar la respuesta a solo 2 propiedades
        setProperties(response.data.slice(0, 2));
      } catch (error) {
        console.error('Error fetching related properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProperties();
  }, [id, price, location, propertyType]); // Recalcular cuando cambien estos valores

  if (loading) {
    return (
      <div className="loading-container text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Cargando propiedades similares...</p>
      </div>
    );
  }

  return (
    <div>
      {properties.length > 0 ? (
        <RelatedList properties={properties} />
      ) : (
        <p>No se encontraron propiedades similares.</p>
      )}
    </div>
  );
};

export default RelatedListContainer;
