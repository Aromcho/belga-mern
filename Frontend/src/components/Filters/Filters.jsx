import React, { useContext, useState, useCallback } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { FaHome, FaCity, FaBed, FaCar, FaSearch } from 'react-icons/fa';
import { FiltersContext } from '../../context/FiltersContext';
import axios from 'axios';
import debounce from 'lodash.debounce'; // Usamos debounce para optimizar las solicitudes
import './Filters.css';

const Filters = ({ onSubmit }) => {
  const { filters, updateFilters } = useContext(FiltersContext);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  const operationTypeOptions = [
    { value: 'Sale', label: 'Venta' },
    { value: 'Rent', label: 'Alquiler' }
  ];

  const propertyTypeOptions = [
    { value: 'House', label: 'Casa' },
    { value: 'Apartment', label: 'Departamento' },
    { value: 'Condo', label: 'PH' },
    { value: 'Land', label: 'Terrenos' },
    { value: 'Office', label: 'Oficinas' },
    { value: 'Garage', label: 'Cocheras' },
    { value: 'Bussiness Premises', label: 'Locales' },
  ];

  // Función para manejar la búsqueda con debounce
  const performSearch = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get('/api/api/properties', {
          params: {
            searchQuery: query, // Realizamos la búsqueda general
            ...filters, // Incluimos los otros filtros como operación o tipo de propiedad
          },
        });
        setAutocompleteSuggestions(response.data.objects); // Actualizamos las sugerencias
        console.log('Resultados de búsqueda:', response.data);
      } catch (error) {
        console.error('Error en la búsqueda:', error);
      }
    } else {
      setAutocompleteSuggestions([]); // Limpiar sugerencias si el query es muy corto
    }
  };

  // Usar debounce para limitar las solicitudes al escribir
  const debouncedSearch = useCallback(debounce((query) => {
    performSearch(query);
  }, 500), [filters]);

  // Manejar los cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    handleFormChange('searchQuery', query);
    debouncedSearch(query); // Ejecutar la búsqueda dinámica mientras se escribe
  };

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  const handleSuggestionSelect = (suggestion) => {
    handleFormChange('searchQuery', suggestion.address || suggestion.location); // Usamos dirección o barrio
    setAutocompleteSuggestions([]); // Limpiamos las sugerencias después de seleccionar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters); // Enviar todos los filtros cuando se presiona el botón Buscar
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: 'none',
      borderColor: state.isFocused ? '#ccc' : '#ddd',
      '&:hover': {
        borderColor: '#ccc',
      },
    }),
  };

  return (
    <Form onSubmit={handleSubmit} className="filter-form">
      <Row className="filter-row mb-2">
        {/* Filtro por tipo de operación */}
        <Col>
          <div className="input-icon-wrapper">
            <FaHome className="input-icon-placeholder" />
            <Select
              isMulti
              placeholder="Tipo de Operación"
              className="filter-input input-with-icon"
              options={operationTypeOptions}
              value={operationTypeOptions.filter(option => filters.operation_type.includes(option.value))}
              onChange={(selected) => handleFormChange(
                'operation_type',
                selected.map(option => option.value)
              )}
              styles={customStyles}
            />
          </div>
        </Col>

        {/* Filtro por tipo de propiedad */}
        <Col>
          <div className="input-icon-wrapper">
            <FaCity className="input-icon-placeholder" />
            <Select
              isMulti
              placeholder="Tipo de Propiedad"
              className="filter-input input-with-icon"
              options={propertyTypeOptions}
              value={propertyTypeOptions.filter(option => filters.property_type.includes(option.value))}
              onChange={(selected) => handleFormChange(
                'property_type',
                selected.map(option => option.value)
              )}
              styles={customStyles}
            />
          </div>
        </Col>

        {/* Filtro por habitaciones */}
        <Col>
          <div className="input-icon-wrapper dorms-wrapper">
            <FaBed className="input-icon-placeholder" />
            <div className="dorms-dropdowns">
              <span className="dorms-placeholder">Dorms.</span>
              <Form.Select
                className="min-max-input"
                value={filters.min_rooms || ''}
                onChange={(e) => handleFormChange('min_rooms', e.target.value)}
              >
                <option value="">min.</option>
                {[...Array(5).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Form.Select>
              <span className="separator">|</span>
              <Form.Select
                className="min-max-input"
                value={filters.max_rooms || ''}
                onChange={(e) => handleFormChange('max_rooms', e.target.value)}
              >
                <option value="">max.</option>
                {[...Array(5).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Col>

        {/* Filtro por cocheras */}
        <Col>
          <div className="input-icon-wrapper garages-wrapper">
            <FaCar className="input-icon-placeholder" />
            <div className="garages-dropdowns">
              <span className="garages-placeholder">Cocheras</span>
              <Form.Select
                className="min-max-input"
                value={filters.min_garages || ''}
                onChange={(e) => handleFormChange('min_garages', e.target.value)}
              >
                <option value="">min.</option>
                {[...Array(5).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Form.Select>
              <span className="separator">|</span>
              <Form.Select
                className="min-max-input"
                value={filters.max_garages || ''}
                onChange={(e) => handleFormChange('max_garages', e.target.value)}
              >
                <option value="">max.</option>
                {[...Array(5).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        </Col>
      </Row>

      {/* Input para búsqueda general */}
      <Row>
        <Col>
          <div className="input-icon-wrapper">
            <FaSearch className="input-icon-placeholder" />
            <Form.Control
              type="text"
              className="filter-input input-with-icon"
              value={filters.searchQuery || ''} // Campo de búsqueda general
              placeholder="Buscar dirección, título, barrio, etc..."
              onChange={handleSearchChange} // Realizar búsqueda mientras escribe
            />
            {/* Mostrar sugerencias de autocompletado */}
            {autocompleteSuggestions.length > 0 && (
              <div className="autocomplete-suggestions">
                <ul>
                  {autocompleteSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion.address} - {suggestion.location.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Col>

        <Col md="auto">
          <Button className="search-button" type="submit">
            BUSCAR
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
