import React, { useContext } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Select from 'react-select';
import { FaHome, FaCity, FaBed, FaCar, FaMapMarkerAlt } from 'react-icons/fa';
import { FiltersContext } from '../../context/FiltersContext';
import './Filters.css';

const Filters = ({ onSubmit }) => {
  const { filters, updateFilters } = useContext(FiltersContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el mínimo no sea mayor que el máximo en habitaciones y cocheras
    if (filters.min_rooms && filters.max_rooms && parseInt(filters.min_rooms) > parseInt(filters.max_rooms)) {
      alert('El número mínimo de habitaciones no puede ser mayor que el número máximo.');
      return;
    }

    if (filters.min_garages && filters.max_garages && parseInt(filters.min_garages) > parseInt(filters.max_garages)) {
      alert('El número mínimo de cocheras no puede ser mayor que el número máximo.');
      return;
    }

    onSubmit(filters);
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

  return (
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

      <Row>
        <Col>
          <div className="input-icon-wrapper">
            <FaMapMarkerAlt className="input-icon-placeholder" />
            <Form.Control
              type="text"
              className="filter-input input-with-icon"
              value={filters.barrio || ''}
              placeholder="Barrios"
              onChange={(e) => handleFormChange('barrio', e.target.value)}
            />
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
