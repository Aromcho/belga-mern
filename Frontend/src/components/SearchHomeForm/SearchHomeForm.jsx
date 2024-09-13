import React from 'react';
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';
import { FaSearch, FaHome, FaBed, FaCity, FaDollarSign } from 'react-icons/fa'; // Iconos
import { MultiRange } from '../MultiRange/MultiRange'; // Sistema de precios previo
import './SearchHomeForm.css';

const SearchHomeForm = ({ formData, setFormData, localidades, handleSubmit }) => {
  return (
    <Container className="search-form w-75">
      <Form onSubmit={handleSubmit} className="filter-form">
        <Row className="filter-row mb-2">
          <Col>
            <InputGroup className="input-group-custom">
              <InputGroup.Text className="input-icon">
                <FaHome />
              </InputGroup.Text>
              <Form.Select
                className="filter-input"
                value={formData.operation_type}
                onChange={(e) => setFormData({ ...formData, operation_type: e.target.value })}
              >
                <option value="">Tipo de Operación</option>
                <option value="Venta">Venta</option>
                <option value="Alquiler">Alquiler</option>
              </Form.Select>
            </InputGroup>
          </Col>

          <Col>
            <InputGroup className="input-group-custom">
              <InputGroup.Text className="input-icon">
                <FaCity />
              </InputGroup.Text>
              <Form.Select
                className="filter-input"
                value={formData.property_type}
                onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
              >
                <option value="">Tipo de Propiedad</option>
                <option value="Casa">Casa</option>
                <option value="Departamento">Departamento</option>
                <option value="PH">PH</option>
                <option value="Terrenos">Terrenos</option>
                <option value="Oficinas">Oficinas</option>
              </Form.Select>
            </InputGroup>
          </Col>

          <Col>
            <InputGroup className="input-group-custom">
              <InputGroup.Text className="input-icon">
                <FaBed />
              </InputGroup.Text>
              <Form.Control
                type="number"
                className="filter-input"
                value={formData.min_rooms}
                placeholder="Dormitorios"
                onChange={(e) => setFormData({ ...formData, min_rooms: e.target.value })}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Sistema de precios con animación y icono */}
        <Row className="filter-row mb-2">
          <Col>
            <div className="price-range-wrapper">
              <span className="price-text">
                <FaDollarSign className="price-icon" /> Precio
              </span>
              <MultiRange
                customWidth={336}
                min={0}
                max={3000000}
                step={20000}
                onChange={({ minVal, maxVal }) => {
                  setFormData({ price_from: minVal, price_to: maxVal });
                }}
              />
              <div className="price-input-wrapper">
                <input
                  className="input--price"
                  type="text"
                  value={formData.price_from || 0}
                  readOnly
                />
                <div className="input-divider" />
                <input
                  className="input--price"
                  type="text"
                  value={formData.price_to || 3000000}
                  readOnly
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="filter-row">
          <Col>
            <InputGroup className="input-group-custom">
              <InputGroup.Text className="input-icon">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                className="filter-input"
                value={formData.barrio}
                placeholder="Buscar..."
                onChange={(e) => setFormData({ ...formData, barrio: e.target.value })}
              />
            </InputGroup>
          </Col>
          <Col md="auto">
            <Button className="search-button" type="submit">
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SearchHomeForm;
