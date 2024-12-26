import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import { FiltersContext } from '../../context/FiltersContext';
import Skeleton from '@mui/material/Skeleton'; 
import './ItemList.css';
import FormList from '../Forms/FormList/FormList.jsx';

const ItemList = () => {
  const { properties, loading, updateFilters, totalProperties, limit, offset, setOffset } = useContext(FiltersContext);

  const totalPages = Math.ceil(totalProperties / limit);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Sincroniza currentPage con offset.
   * Si offset cambia, actualiza currentPage.
   */
  useEffect(() => {
    setCurrentPage(Math.floor(offset / limit) + 1);
  }, [offset, limit]);

  /**
   * Desplaza al inicio de la página después de cambiar de página.
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  /**
   * Maneja el cambio a la siguiente página.
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setOffset(currentPage * limit);
    }
  };

  /**
   * Maneja el cambio a la página anterior.
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setOffset((currentPage - 2) * limit);
    }
  };

  /**
   * Maneja el clic en una página específica.
   */
  const handlePageClick = (page) => {
    setOffset((page - 1) * limit);
  };

  /**
   * Genera las páginas visibles en la paginación.
   */
  const getPagesToShow = () => {
    const pages = [];
    const maxPagesToShow = 4;
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
    <>
      <Filters className="p-0 mb-1 pt-5 mt-5" onSubmit={updateFilters} />
      <Container className='px-0'>
        <div className="item-list">
          {loading ? (
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

        <Row className="pagination-cont my-5 align-items-center justify-content-between">
          <Col xs="auto" className="text-start">
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
      <FormList className="my-5" />
    </>
  );
};

export default ItemList;
