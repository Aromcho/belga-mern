import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FiltersContext } from '../../context/FiltersContext';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const { properties } = useContext(FiltersContext);
  console.log(properties);
  // Restaurar la posición del scroll cuando el componente se monta
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }
  }, []);

  // Guardar la posición del scroll antes de navegar a la página de detalles
  const handlePropertyClick = (propertyId) => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    // Aquí debes agregar la lógica para navegar a la página de detalles de la propiedad
  };

  return (
    <Container className="item-list-container">
      <ItemList properties={properties} onPropertyClick={handlePropertyClick} />
    </Container>
  );
};

export default ItemListContainer;
