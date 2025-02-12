import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FiltersContext } from '../../context/FiltersContext';
import ItemList from '../ItemList/ItemList';
import { useParams, useNavigate } from 'react-router-dom';

const ItemListContainer = () => {
  const { properties, updateFilters, filters } = useContext(FiltersContext);
  const { operation, type } = useParams(); // Capturamos los parámetros dinámicos
  const navigate = useNavigate();
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    if (!filtersApplied) {
      const validOperations = {
        venta: 'Venta',
        alquiler: 'Alquiler'
      };

      const validTypes = {
        casa: 'Casa',
        departamento: 'Departamento',
        ph: 'PH',
        terreno: 'Terreno',
        oficina: 'Oficina',
        cochera: 'Cochera',
        local: 'Local',
        edificio: 'Edificio'
      };

      let newFilters = {};

      // Aplicamos filtro por tipo de operación si es válido
      if (operation && validOperations[operation]) {
        newFilters.operation_type = [validOperations[operation]];
      }

      // Aplicamos filtro por tipo de propiedad si es válido
      if (type && validTypes[type]) {
        newFilters.property_type = [validTypes[type]];
      }

      if (Object.keys(newFilters).length > 0) {
        updateFilters(newFilters);
        setFiltersApplied(true);
      }
    }
  }, [operation, type, updateFilters, filtersApplied]);

  useEffect(() => {
    const fromHome = sessionStorage.getItem('fromHome');

    if (!fromHome) {
      const scrollPosition = parseInt(sessionStorage.getItem('scrollPosition'), 10);
      if (scrollPosition && !isNaN(scrollPosition)) {
        window.scrollTo({ top: scrollPosition, behavior: 'instant' });
      }
    } else {
      sessionStorage.removeItem('fromHome');
    }

    return () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };
  }, []);

  const handlePropertyClick = (propertyId) => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    navigate(`/property/${propertyId}`);
  };

  return (
    <Container className="item-list-container">
      <ItemList properties={properties} onPropertyClick={handlePropertyClick} />
    </Container>
  );
};

export default ItemListContainer;
