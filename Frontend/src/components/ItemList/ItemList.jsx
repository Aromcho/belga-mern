import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import { FiltersContext } from '../../context/FiltersContext';
import VenderForm from '../Forms/VenderForm/VenderForm.jsx';
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
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setOffset((currentPage - 2) * limit);
      setCurrentPage(currentPage - 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handlePageClick = (page) => {
    setOffset((page - 1) * limit);
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

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
      <Container className='px-0 ' >
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
      <VenderForm className="my-5 py-5 "/>
    </>
  );
};

export default ItemList;
