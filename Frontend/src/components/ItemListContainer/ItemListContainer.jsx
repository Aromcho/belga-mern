import React, { useContext } from 'react';
import { Spinner, Container } from 'react-bootstrap';
import { FiltersContext } from '../../context/FiltersContext'; // Importar el contexto
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const { properties } = useContext(FiltersContext); // Usar las propiedades y el estado de carga del contexto

  return (
    <Container className="item-list-container">
       <ItemList properties={properties} />
    </Container>
  );
};

export default ItemListContainer;
  