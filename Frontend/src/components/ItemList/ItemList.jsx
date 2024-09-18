import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importando las flechas
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import { FiltersContext } from '../../context/FiltersContext'; // Importar el contexto
import './ItemList.css';

const ItemList = () => {
  const { filters, updateFilters } = useContext(FiltersContext); // Usar el contexto de filtros
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [limit, setLimit] = useState(20); // Número de propiedades por página
  const [offset, setOffset] = useState(0); // Para el desplazamiento
  const [totalProperties, setTotalProperties] = useState(0); // Total de propiedades en la base de datos
  const [currentPage, setCurrentPage] = useState(1); // Página actual

  const totalPages = Math.ceil(totalProperties / limit); // Calcular el número total de páginas

  useEffect(() => {
    fetchProperties(filters); // Filtrar usando los filtros del contexto
  }, [filters, limit, offset]);

  const fetchProperties = async (filters = {}) => {
    try {
      const response = await axios.get('/api/api/properties', {
        params: {
          operation_type: filters.operation_type, // Enviar los filtros desde el contexto
          property_type: filters.property_type,
          minRooms: filters.min_rooms,
          maxRooms: filters.max_rooms,
          minGarages: filters.min_garages,
          maxGarages: filters.max_garages,
          minPrice: filters.price_from,
          maxPrice: filters.price_to,
          barrio: filters.barrio,
          limit,
          offset,
        },
      });

      setFilteredProperties(response.data.objects);
      setTotalProperties(response.data.meta.total_count); // Total de propiedades devueltas por el backend
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    }
  };

  // Esta función se llama al aplicar nuevos filtros desde el componente Filters
  const handleFilterApply = (newFilters) => {
    updateFilters(newFilters); // Actualizar los filtros en el contexto
    setOffset(0); // Reiniciar la paginación al aplicar filtros
    setCurrentPage(1); // Reiniciar la página a 1
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
    <Container className="p-0 mb-1">
      {/* Componente de filtros */}
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
          {currentPage > 1 && (
            <FaChevronLeft
              className="pagination-arrow w-25 h-25 p-4"
              onClick={handlePreviousPage}
            />
          )}
        </Col>
        <Col className="text-center">
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
