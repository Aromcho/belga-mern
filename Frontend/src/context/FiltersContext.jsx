import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    operation_type: [],  
    property_type: [],   
    min_rooms: undefined,
    max_rooms: undefined,
    min_garages: undefined,
    max_garages: undefined,
    price_from: undefined,
    price_to: undefined,
    searchQuery: '',
    barrio: '',
    order: 'desc',
    is_starred: undefined,
  });

  const [properties, setProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  // Estado adicional para manejar filtros exclusivos como destacados
  const [starredFilterActive, setStarredFilterActive] = useState(false);

  // Función para actualizar filtros globales
  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setOffset(0);
  };

  // Solicitud de búsqueda de propiedades
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
          order: filters.order,
          is_starred: starredFilterActive ? true : filters.is_starred,
          limit,
          offset,
        },
      });
      setProperties(response.data.objects);
      setTotalProperties(response.data.meta.total_count);
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, limit, offset, starredFilterActive]);

  // Llamar a `fetchProperties` cuando los filtros cambien
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
      setOffset,
      setStarredFilterActive, // Exponemos el estado de destacados
    }}>
      {children}
    </FiltersContext.Provider>
  );
};
