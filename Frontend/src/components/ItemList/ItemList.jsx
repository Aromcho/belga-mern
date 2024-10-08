import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import { FiltersContext } from '../../context/FiltersContext';
import Skeleton from '@mui/material/Skeleton'; 
import './ItemList.css';

const ItemList = () => {
  const { properties, loading, updateFilters, totalProperties, limit, offset, setOffset } = useContext(FiltersContext);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalProperties / limit);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setOffset((currentPage) * limit);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setOffset((currentPage - 2) * limit);
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setOffset((page - 1) * limit);
    setCurrentPage(page);
  };

  const getPagesToShow = () => {
    const pages = [];
    const maxPagesToShow = 4; // Mostramos 5 páginas a la vez
    let startPage = currentPage - Math.floor(maxPagesToShow / 2);
    startPage = Math.max(startPage, 1);
    let endPage = startPage + maxPagesToShow - 1;
    endPage = Math.min(endPage, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Container className="p-0 mb-1">
      <Filters onSubmit={updateFilters} />
      <div className="item-list">
        {loading ? (
          // Skeleton mientras carga
          <>
            {[...Array(4)].map((_, index) => (
              <div className="Item mb-2" key={index}>
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
        ) : properties.length > 0 ? (
          properties.map((property) => (
            <Item className="Item" key={property.id} property={property} />
          ))
        ) : (
          <p>No se encontraron propiedades.</p>
        )}
      </div>

      <Row className="mt-3 mb-3 align-items-center justify-content-between">
        <Col xs="auto" className="text-start"> {/* Usamos xs="auto" para ajustar mejor en pantallas pequeñas */}s
    {currentPage > 1 && (
      <FaChevronLeft
        className="pagination-arrow"
        onClick={handlePreviousPage}
      />
    )}
  </Col>
  <Col xs="auto" className="text-center">
    {getPagesToShow().map((page) => (
      <span
        key={page}
        className={`pagination-page ${page === currentPage ? 'active' : ''}`}
        onClick={() => handlePageClick(page)}
      >
        {page}
      </span>
    ))}
  </Col>
  <Col xs="auto" className="text-end">
    {currentPage < totalPages && (
      <FaChevronRight
        className="pagination-arrow"
        onClick={handleNextPage}
      />
    )}
  </Col>
</Row>

    </Container>
  );
};

export default ItemList;
