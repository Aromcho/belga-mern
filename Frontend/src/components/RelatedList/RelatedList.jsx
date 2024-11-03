import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Item from '../Item/Item.jsx';
import Filters from '../Filters/Filters.jsx';
import '../ItemList/ItemList.css';

const  RelatedList = ({ properties }) => {
  console.log(properties);

  return (
    <Container className="p-1 mb-1">
      <div className="item-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <Item key={property.id} property={property} />
          ))
        ) : (
          <p>No se encontraron propiedades.</p>
        )}
      </div>
    </Container>
  );
};

export default RelatedList;