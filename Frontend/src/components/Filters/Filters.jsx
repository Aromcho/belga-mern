import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import './Filters.css';

const Filters = ({ onSubmit }) => {
  const [operationType, setOperationType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minRooms, setMinRooms] = useState('');
  const [maxRooms, setMaxRooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [barrio, setBarrio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      operationType,
      propertyType,
      minRooms,
      maxRooms,
      minPrice,
      maxPrice,
      barrio
    };
    onSubmit(filters);
  };

  return (
    <Container className="search-form">
      <Form onSubmit={handleSubmit} className="filter-form">
        <Row className="filter-row">
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
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="minRooms">
              <Form.Control
                type="number"
                className="filter-input"
                value={minRooms}
                placeholder="Dormitorios"
                onChange={(e) => setMinRooms(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="minBaths">
              <Form.Control
                type="number"
                className="filter-input"
                value={maxRooms}
                placeholder="Baños"
                onChange={(e) => setMaxRooms(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="garage">
              <Form.Control
                type="text"
                className="filter-input"
                value={minPrice}
                placeholder="Cocheras"
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
                placeholder="Precio"
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
