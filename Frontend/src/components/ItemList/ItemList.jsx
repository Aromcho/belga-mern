import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import './ItemList.css';

const ItemList = ({ properties }) => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [limit, setLimit] = useState(20); // Número de propiedades por página
  const [offset, setOffset] = useState(0); // Para el desplazamiento
  const [totalProperties, setTotalProperties] = useState(0); // Total de propiedades en la base de datos

  useEffect(() => {
    fetchProperties();
  }, [limit, offset]);

  const fetchProperties = async (filters = {}) => {
    try {
      // Solicitar propiedades con filtros y paginación
      const response = await axios.get('/api/properties', {
        params: {
          operation_type: filters.operationType,
          property_type: filters.propertyType,
          minRooms: filters.minRooms,
          maxRooms: filters.maxRooms,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          barrio: filters.barrio,
          limit,
          offset, // Aquí pasamos el offset para la paginación
        }
      });

      setFilteredProperties(response.data.objects);
      setTotalProperties(response.data.meta.total_count); // Total de propiedades devueltas por el backend
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    }
  };

  const handleFilterApply = (filters) => {
    setOffset(0); // Reiniciar la paginación al aplicar filtros
    fetchProperties(filters);
  };

  const handleNextPage = () => {
    if (offset + limit < totalProperties) {
      setOffset(offset + limit);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <Container className="p-1 mb-1">
      <Filters onSubmit={handleFilterApply} />
      <div className="item-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Item key={property._id} property={property} />
          ))
        ) : (
          <p>No se encontraron propiedades.</p>
        )}
      </div>

      {/* Paginación */}
      <Row className="mt-3">
        <Col>
          <Button disabled={offset === 0} onClick={handlePreviousPage}>
            Anterior
          </Button>
        </Col>
        <Col className="text-center">
          <span>
            Mostrando {offset + 1} - {Math.min(offset + limit, totalProperties)} de {totalProperties}
          </span>
        </Col>
        <Col className="text-end">
          <Button disabled={offset + limit >= totalProperties} onClick={handleNextPage}>
            Siguiente
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemList;
