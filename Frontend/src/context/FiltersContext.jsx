import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    operation_type: [],  
    property_type: [],   
    min_rooms: 1,
    max_rooms: undefined,
    min_garages: undefined,
    max_garages: undefined,
    price_from: undefined,
    price_to: undefined,
    searchQuery: '',
    barrio: '',
  });

  const [properties, setProperties] = useState([]); // Propiedades actuales
  const [totalProperties, setTotalProperties] = useState(0); // Total de propiedades devueltas por la API
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10); // Límite de propiedades por página
  const [offset, setOffset] = useState(0); // Índice de desplazamiento para paginación

  // Función para actualizar los filtros
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Solicitud de búsqueda de propiedades centralizada
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/property/properties', {
        params: {
          operation_type: filters.operation_type,
          property_type: filters.property_type,
          minRooms: filters.min_rooms,
          maxRooms: filters.max_rooms,
          minGarages: filters.min_garages,
          maxGarages: filters.max_garages,
          minPrice: filters.price_from,
          maxPrice: filters.price_to,
          barrio: filters.barrio,
          searchQuery: filters.searchQuery,
          limit,  // Incluyendo límite de resultados por página
          offset, // Offset para controlar el desplazamiento en paginación
        },
      });
      setProperties(response.data.objects); // Propiedades actuales para la página solicitada
      setTotalProperties(response.data.meta.total_count); // Total de propiedades de la API
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, limit, offset]);

  // Llamada a fetchProperties cuando cambian los filtros o el offset
  useEffect(() => {
    fetchProperties();
  }, [filters, fetchProperties, limit, offset]);

  return (
    <FiltersContext.Provider value={{
      filters, 
      updateFilters, 
      properties, 
      totalProperties, 
      loading, 
      limit, 
      offset, 
      setLimit, 
      setOffset 
    }}>
      {children}
    </FiltersContext.Provider>
  );
};
