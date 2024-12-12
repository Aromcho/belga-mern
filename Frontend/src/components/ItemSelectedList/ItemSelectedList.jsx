import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import Skeleton from '@mui/material/Skeleton';
import FormList from '../Forms/FormList/FormList.jsx';

const ItemSelectedList = ({ properties, onPropertyClick }) => {
  return (
    <>
      <Filters className="w-0 p-0 mb-1 pt-5 mt-5" />

      <Container className="px-0">
        <div className="item-list">
          {properties.length > 0 ? (
            properties.map((property) => (
              <Item
                className="Item"
                key={property.id}
                property={property}
                onClick={() => onPropertyClick(property.id)}
              />
            ))
          ) : (
            [...Array(4)].map((_, index) => (
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
            ))
          )}
        </div>
      </Container>
      <FormList className="my-5 "/>
    </>
  );
};

export default ItemSelectedList;