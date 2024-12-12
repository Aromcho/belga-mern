import React, { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import ItemSelectedList from '../ItemSelectedList/ItemSelectedList';
import { useNavigate } from 'react-router-dom';
import { FiltersContext } from '../../context/FiltersContext';
import '../ItemListContainer/ItemListContainer.css';

const ItemListSelectedContainer = () => {
  const { setStarredFilterActive, properties } = useContext(FiltersContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Activar filtro de destacados al entrar
    setStarredFilterActive(true);

    return () => {
      // Desactivar filtro de destacados al salir
      setStarredFilterActive(false);
    };
  }, [setStarredFilterActive]);

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <Container className="item-list-container">
      <ItemSelectedList properties={properties} onPropertyClick={handlePropertyClick} />
    </Container>
  );
};

export default ItemListSelectedContainer;
