import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import '../ItemList/ItemList.css';

const  SelectionList = ({ properties }) => {
  const [filteredProperties, setFilteredProperties] = useState(properties.slice(0, 2)); // Inicializamos con solo 2 propiedades

  const handleFilterApply = async (filters) => {
    try {
      // Llama al backend con los filtros aplicados
      const response = await axios.get('/api/properties', {
        params: {
          operation_type: filters.operationType,
          property_type: filters.propertyType,
          minRooms: filters.minRooms,
          maxRooms: filters.maxRooms,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          barrio: filters.barrio
        }
      });
      
      // Guardamos solo las primeras 2 propiedades del resultado
      setFilteredProperties(response.data.objects.slice(0, 2));
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    }
  };

  return (
    <Container className="p-1 mb-1">
      <div className="item-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Item key={property._id} property={property} />
          ))
        ) : (
          <p>No se encontraron propiedades.</p>
        )}
      </div>
    </Container>
  );
};

export default SelectionList;
