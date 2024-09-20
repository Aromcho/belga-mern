import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import { FiltersContext } from '../../context/FiltersContext';
import Skeleton from '@mui/material/Skeleton'; // Importa el Skeleton de Material UI
import './ItemList.css';

const ItemList = () => {
  const { filters, updateFilters } = useContext(FiltersContext);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const totalPages = Math.ceil(totalProperties / limit);

  useEffect(() => {
    fetchProperties(filters);
  }, [filters, limit, offset]);

  const fetchProperties = async (filters = {}) => {
    setLoading(true); // Mostrar el loader
    try {
      const response = await axios.get('/api/api/properties', {
        params: {
          operation_type: filters.operation_type,
          property_type: filters.property_type,
          minRooms: filters.min_rooms,
          maxRooms: filters.max_rooms,
          minGarages: filters.min_garages,
          maxGarages: filters.max_garages,
          minPrice: filters.price_from,
          maxPrice: filters.price_to,
          barrio: filters.barrio,
          searchQuery: filters.searchQuery,
          limit,
          offset,
        },
      });

      setFilteredProperties(response.data.objects);
      setTotalProperties(response.data.meta.total_count);
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    } finally {
      setLoading(false); // Ocultar el loader después de cargar
    }
  };

  const handleFilterApply = (newFilters) => {
    updateFilters(newFilters);
    setOffset(0);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (offset + limit < totalProperties && currentPage < totalPages) {
      setOffset(offset + limit);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0 && currentPage > 1) {
      setOffset(offset - limit);
      setCurrentPage(currentPage - 1);
    }
  };

  const getPagesToShow = () => {
    const pages = [];
    const startPage = currentPage;
    const endPage = Math.min(currentPage + 3, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Container className="p-0 mb-1">
      <Filters onSubmit={handleFilterApply} />
      <div className="item-list">
        {loading ? (
          // Mostrar el loader mientras se cargan las propiedades
          <>
            {[...Array(4)].map((_, index) => (
              <div className="Item" key={index}>
                <Skeleton variant="rectangular" height={300} />
                <div className="card-body">
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="60%" />
                  <div className="property-info d-flex justify-content-around mt-2 mb-2">
                    <Skeleton variant="rectangular" width={50} height={50} />
                    <Skeleton variant="rectangular" width={50} height={50} />
                    <Skeleton variant="rectangular" width={50} height={50} />
                    <Skeleton variant="rectangular" width={50} height={50} />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Item className="Item" key={property._id} property={property} />
          ))
        ) : (
          <p>No se encontraron propiedades.</p>
        )}
      </div>

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
                setOffset((page - 1) * limit);
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
