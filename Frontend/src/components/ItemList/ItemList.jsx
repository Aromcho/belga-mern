import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importando las flechas
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import './ItemList.css';

const ItemList = ({ properties }) => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [limit, setLimit] = useState(20); // Número de propiedades por página
  const [offset, setOffset] = useState(0); // Para el desplazamiento
  const [totalProperties, setTotalProperties] = useState(0); // Total de propiedades en la base de datos
  const [currentPage, setCurrentPage] = useState(1); // Página actual

  const totalPages = Math.ceil(totalProperties / limit); // Calcular el número total de páginas

  useEffect(() => {
    fetchProperties();
  }, [limit, offset]);

  const fetchProperties = async (filters = {}) => {
    try {
      // Solicitar propiedades con filtros y paginación
      const response = await axios.get('/api/api/properties', {
        params: {
          operation_type: filters.operationType,
          property_type: filters.propertyType,
          minRooms: filters.minRooms,
          maxRooms: filters.maxRooms,
          garages: filters.garages, // Asegurarse de que cocheras se envíen al backend

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
    setCurrentPage(1); // Reiniciar la página a 1
    fetchProperties(filters);
  };

  const handleNextPage = () => {
    if (offset + limit < totalProperties && currentPage < totalPages) {
      setOffset(offset + limit);
      setCurrentPage(currentPage + 1); // Cambiar a la siguiente página
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0 && currentPage > 1) {
      setOffset(offset - limit);
      setCurrentPage(currentPage - 1); // Cambiar a la página anterior
    }
  };

  // Calcular las páginas que se van a mostrar (página actual + 3)
  const getPagesToShow = () => {
    const pages = [];
    const startPage = currentPage;
    const endPage = Math.min(currentPage + 3, totalPages); // Mostrar solo las próximas 3 páginas

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Container className="p-1 mb-1">
      <Filters onSubmit={handleFilterApply} />
      <div className="item-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Item className="Item" key={property._id} property={property} />
          ))
        ) : (
          <p>No se encontraron propiedades.</p>
        )}
      </div>

      {/* Paginación */}
      <Row className="mt-3 align-items-center">
        <Col className="text-start">
          {/* Flecha izquierda (anterior) */}
          {currentPage > 1 && (
            <FaChevronLeft
              className="pagination-arrow w-25 h-25 p-4"
              onClick={handlePreviousPage}
            />
          )}
        </Col>
        <Col className="text-center">
          {/* Mostrando las páginas actuales */}
          {getPagesToShow().map((page) => (
            <span
              key={page}
              className={`pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(page);
                setOffset((page - 1) * limit); // Ajustar el offset basado en la página seleccionada
              }}
            >
              {page}
            </span>
          ))}
        </Col>
        <Col className="text-end">
          {/* Flecha derecha (siguiente) */}
          {currentPage < totalPages && (
            <FaChevronRight
              className="pagination-arrow w-25 h-25 p-4"
              onClick={handleNextPage}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ItemList;
