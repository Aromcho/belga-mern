import React, { useContext } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Select from 'react-select';
import { FaHome, FaBed, FaCity } from 'react-icons/fa';
import MultiRangeSlider from '../MultiRangeSlider/MultiRangeSlider.jsx';
import { FiltersContext } from '../../context/FiltersContext';
import './SearchHomeForm.css';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';

const SearchHomeForm = ({ handleSubmit }) => {
  const { filters, updateFilters } = useContext(FiltersContext); // Solo contexto, sin estados locales
  const location = useLocation();

  const isHome = location.pathname === "/";

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
  ];

  const handleFormChange = (field, value) => {
    updateFilters({ [field]: value });
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
    <Container className="search-form">
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
                isSearchable={false}
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
                isSearchable={false}
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

        {/* Se mantiene solo el SearchBar sin estados extra */}
        <SearchBar onSubmit={(updatedFilters) => {
updateFilters(updatedFilters);
}} />


        <Row className="filter-row mt-3">
          <Col>
            <div className="price-range-wrapper">
              <MultiRangeSlider
                min={0}
                max={3000000}
                step={20000}
                defaultValue={[filters.price_from || 0, filters.price_to || 3000000]} // Inicializa con valores del contexto
                onChange={(newValue) => {
                  handleFormChange('price_from', newValue[0]); // Actualiza el filtro mínimo
                  handleFormChange('price_to', newValue[1]);   // Actualiza el filtro máximo
                }}
              />
            </div>
          </Col>
          <Col md="auto">
            <Button className="search-button" type="submit">
              BUSCAR
            </Button>
          </Col>
        </Row>

        <Button as={Link} to={"/quiero-vender"} className="button--vender me-3 px-5" variant="outline-light">
          quiero vender
        </Button>
      </Form>
    </Container>
  );
};

export default SearchHomeForm;
