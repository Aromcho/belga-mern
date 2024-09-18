import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Select from 'react-select';
import { FaSearch, FaHome, FaBed, FaCity } from 'react-icons/fa';
import MultiRangeSlider from '../MultiRangeSlider/MultiRangeSlider.jsx';
import { FiltersContext } from '../../context/FiltersContext';
import './SearchHomeForm.css';
import axios from 'axios';

const SearchHomeForm = ({ handleSubmit }) => {
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

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: 'none', // Eliminar el sombreado por defecto
      borderColor: state.isFocused ? '#ccc' : '#ddd', // Cambiar el color del borde cuando está enfocado
      '&:hover': {
        borderColor: '#ccc', // Color del borde al pasar el mouse
      },
    }),
  };
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    handleFormChange('barrio', query);

    if (query.length > 2) { // Hacer la búsqueda solo si hay más de 2 caracteres
      try {
        const response = await axios.get('/api/api/autocomplete', {
          params: { query }
        });
        setAutocompleteSuggestions(response.data); // Actualizar las sugerencias
      } catch (error) {
        console.error('Error en el autocompletado:', error);
      }
    } else {
      setAutocompleteSuggestions([]);
    }
  };


  return (
    <Container className="search-form w-75">
      <Form onSubmit={handleSubmit} className="filter-form">
        <Row className="filter-row mb-2">
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
          <Col>
            <div className="input-icon-wrapper dorms-wrapper">
              <FaBed className="input-icon-placeholder" />
              <div className="dorms-dropdowns">
                <span className="dorms-placeholder">Dorms.</span>
                <Form.Select
                  className="min-max-input"
                  value={filters.min_rooms}
                  onChange={(e) => handleFormChange('min_rooms', e.target.value)}
                >
                  <option value="">min.</option>
                  {[...Array(6).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Select>
                <span className="separator">|</span>
                <Form.Select
                  className="min-max-input"
                  value={filters.max_rooms}
                  onChange={(e) => handleFormChange('max_rooms', e.target.value)}
                >
                  <option value="">max.</option>
                  {[...Array(6).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="filter-row">
          <Col>
            <div className="price-range-wrapper">
              <MultiRangeSlider
                customWidth={336}
                min={0}
                max={3000000}
                step={20000}
                onChange={({ minVal, maxVal }) => handleFormChange('price_from', minVal, 'price_to', maxVal)}
              />
            </div>
          </Col>
        </Row>
        <Row className="filter-row">
          <Col>
            <div className="input-icon-wrapper">
              <FaSearch className="input-icon-placeholder" />
              <Form.Control
                type="text"
                className="filter-input input-with-icon"
                value={filters.barrio}
                placeholder="Buscar..."
                onChange={handleSearchChange}
              />
              {/* Mostrar sugerencias de autocompletado */}
              {autocompleteSuggestions.length > 0 && (
                <div className="autocomplete-suggestions">
                  <ul>
                    {autocompleteSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => handleFormChange('barrio', suggestion.title)}
                      >
                        {suggestion.title} - {suggestion.location}
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
    </Container>
  );
};

export default SearchHomeForm;
