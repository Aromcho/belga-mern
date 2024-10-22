import React, { useContext, useState, useCallback } from 'react';
import { Form, Button, Row, Col, Collapse } from 'react-bootstrap';
import Select from 'react-select';
import { FaHome, FaCity, FaBed, FaCar, FaSearch, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { FiltersContext } from '../../context/FiltersContext';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './Filters.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Filters = ({ onSubmit }) => {
  const { filters, updateFilters } = useContext(FiltersContext);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Estado para manejar el colapso en móvil
  const [query, setQuery] = useState(filters.searchQuery || ''); // Usamos el valor de 'filters' inicialmente
  const [sortOrder, setSortOrder] = useState(filters.sortOrder || 'asc'); // Estado para manejar el orden del precio

  const operationTypeOptions = [
    { value: 'Venta', label: 'Venta' },
    { value: 'Alquiler', label: 'Alquiler' }
  ];

  const propertyTypeOptions = [
    { value: 'Casa', label: 'Casa' },
    { value: 'Departamento', label: 'Departamento' },
    { value: 'PH', label: 'PH' },
    { value: 'Terreno', label: 'Terrenos' },
    { value: 'Oficina', label: 'Oficinas' },
    { value: 'Cochera', label: 'Cocheras' },
    { value: 'Local', label: 'Locales' },
    { value: 'Edificio', label: 'Edificios' },
  ];

  const performSearch = async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get('/api/property/autocomplete', {
          params: {
            query: query
          },
        });
        setAutocompleteSuggestions(response.data);
      } catch (error) {
        console.error('Error en la búsqueda:', error);
      }
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const debouncedSearch = useCallback(debounce((query) => {
    performSearch(query);
  }, 500), []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setQuery(query); // Actualizamos el estado local
    debouncedSearch(query); // Llamamos a la búsqueda difusa
  };

  const handleSuggestionSelect = (suggestion) => {
    updateFilters({ searchQuery: suggestion.value }); // Actualizamos el contexto
    setAutocompleteSuggestions([]); // Limpiamos las sugerencias
    setQuery(suggestion.value); // Actualizamos el campo de búsqueda con la selección
  };

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  // Cambiar el orden de los precios
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    updateFilters({ sortOrder: newOrder }); // Actualizamos el estado en los filtros
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters); // Disparar la búsqueda con los filtros seleccionados
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
      {/* Input para búsqueda general */}
      <Row>
        <Col>
          <div className="input-icon-wrapper">
            <FaSearch className="input-icon-placeholder" />
            <Form.Control
              type="text"
              className="filter-input input-with-icon"
              value={query} // Usamos el estado local "query"
              placeholder="Buscar dirección, título, barrio, etc..."
              onChange={handleSearchChange}
            />
            {autocompleteSuggestions.length > 0 && (
              <div className="autocomplete-suggestions">
                <ul>
                  {autocompleteSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.value}
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                     {suggestion.value} {suggestion.secundvalue && ` - ${suggestion.secundvalue}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Col>

        <Col md="auto">
          <Button className="search-button search-button-filter" type="submit">
            BUSCAR
          </Button>
        </Col>
      </Row>

      {/* Botón para mostrar/ocultar filtros en versión móvil */}
      <Row className="d-md-none mt-3">
        <Col>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            aria-controls="filters-collapse"
            aria-expanded={showFilters}
            className="search-button"
          >
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
        </Col>
      </Row>

      {/* Filtros adicionales en móvil (colapsados por defecto) */}
      <Collapse in={showFilters} className="d-md-none">
        <div id="filters-collapse">
          <Row className="filter-row mt-3">
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
        </div>
      </Collapse>

      {/* Filtros siempre visibles en escritorio */}
      <Row className="filter-row d-none d-md-flex mt-3">
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

      {/* Ordenar por precio */}
      <Row className="filter-row d-none d-md-flex mt-3">
        <Col>
          <Button as={Link} to="/" variant="light" className="w-100 custom-button">
            <FaArrowLeft className="me-2" />
            Volver al inicio
          </Button>
        </Col>
        <Col md="auto">
          <Button onClick={toggleSortOrder} variant="light" className="w-100 custom-button">
            Ordenar por precio {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
