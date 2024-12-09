import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';

const ItemSelectedList = ({ properties, onPropertyClick }) => {
    
  return (
    <>
    <Filters className="w-0 p-0 mb-1 pt-5 mt-5"/>

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
          <p>No se encontraron propiedades.</p>
        )}
      </div>
    </Container>
    </>
    
  );
};

export default ItemSelectedList;
