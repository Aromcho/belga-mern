import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import './Filters.css';

const Filters = ({ onSubmit }) => {
  const [operationType, setOperationType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minRooms, setMinRooms] = useState(''); // Min habitaciones
  const [maxRooms, setMaxRooms] = useState(''); // Max habitaciones
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [garages, setGarages] = useState(''); // Nuevo estado para cocheras
  const [barrio, setBarrio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el mínimo no sea mayor que el máximo
    if (minRooms && maxRooms && parseInt(minRooms) > parseInt(maxRooms)) {
      alert('El número mínimo de habitaciones no puede ser mayor que el número máximo.');
      return;
    }

    const filters = {
      operationType,
      propertyType,
      minRooms: minRooms ? minRooms : 0, // Si minRooms no está seleccionado, comenzar desde 0
      maxRooms: maxRooms ? maxRooms : undefined, // Si maxRooms no está seleccionado, sin límite máximo
      minPrice,
      maxPrice,
      garages,
      barrio
    };

    onSubmit(filters);
  };

  return (
    <Container className="search-form">
      <Form onSubmit={handleSubmit} className="filter-form">
        <Row className="filter-row mb-2">
          <Col>
            <Form.Group controlId="operationType">
              <Form.Control
                as="select"
                className="filter-input"
                value={operationType}
                onChange={(e) => setOperationType(e.target.value)}
              >
                <option value="">Tipo de Operación</option>
                <option value="Sale">Venta</option>
                <option value="Rent">Alquiler</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="propertyType">
              <Form.Control
                as="select"
                className="filter-input"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Tipo de Propiedad</option>
                <option value="House">Casa</option>
                <option value="Apartment">Departamento</option>
                <option value="Condo">PH</option>
                <option value="Land">Terrenos</option>
                <option value="Office">Oficinas</option>
                <option value="Garage">Cocheras</option>
                <option value="Bussiness Premises">Locales</option>
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Input combinado para Dormitorios */}
          <Col>
            <div className="dorms-container">
              <span className="dorms-label">Dorms.</span>
              <Form.Group className="dorms-dropdowns">
                <Form.Control
                  as="select"
                  className="min-max-input"
                  value={minRooms}
                  onChange={(e) => setMinRooms(e.target.value)}
                >
                  <option value="">min.</option>
                  {[...Array(5).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Control>
                <span className="separator">|</span>
                <Form.Control
                  as="select"
                  className="min-max-input"
                  value={maxRooms}
                  onChange={(e) => setMaxRooms(e.target.value)}
                >
                  <option value="">max.</option>
                  {[...Array(5).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
          </Col>

          <Col>
          <Form.Group controlId="garages">
  <Form.Control
    type="number"
    className="filter-input"
    value={garages}
    placeholder="Cocheras"
    onChange={(e) => setGarages(e.target.value)}
  />
</Form.Group>

          </Col>
          <Col>
            <Form.Group controlId="minPrice">
              <Form.Control
                type="number"
                className="filter-input"
                value={minPrice}
                placeholder="Precio mínimo"
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="maxPrice">
              <Form.Control
                type="number"
                className="filter-input"
                value={maxPrice}
                placeholder="Precio máximo"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="barrio">
              <Form.Control
                type="text"
                className="filter-input"
                value={barrio}
                placeholder="Barrios"
                onChange={(e) => setBarrio(e.target.value)}
              />
            </Form.Group>
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

export default Filters;
