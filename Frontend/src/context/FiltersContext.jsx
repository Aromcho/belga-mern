import React, { createContext, useState } from 'react';

// Crear el contexto
export const FiltersContext = createContext();

// Proveedor del contexto
export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    operation_type: [],  
    property_type: [],   
    min_rooms: 1,  // Iniciar en undefined en lugar de ''
    max_rooms: undefined,
    min_garages: undefined,  // Iniciar en undefined en lugar de 0
    max_garages: undefined,
    price_from: 0,
    price_to: 3000000,
    barrio: ''
  });

  // Función para actualizar los filtros
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
