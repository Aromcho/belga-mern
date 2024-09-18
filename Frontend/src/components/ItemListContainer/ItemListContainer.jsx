import React, { useContext, useEffect, useState } from 'react';
import { Spinner, Container } from 'react-bootstrap';
import { FiltersContext } from '../../context/FiltersContext'; // Importar el contexto

import ItemList from '../ItemList/ItemList';
import axios from 'axios';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const { filters } = useContext(FiltersContext); // Usar los filtros del contexto
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/api/properties', {
          params: {
            operation_type: filters.operation_type,
            property_type: filters.property_type,
            minRooms: filters.min_rooms,
            maxRooms: filters.max_rooms,
            minPrice: filters.price_from,
            maxPrice: filters.price_to,
            barrio: filters.barrio,
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
  }, [filters]);

  

  return (
    <Container className="item-list-container">
      <ItemList properties={properties} />
    </Container>
  );
};

export default ItemListContainer;
