import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DevelopmentItem from "../../components/DevelopmentsItem/DevelopmentsItem";
import axios from "axios";
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Emprendimientos = () => {
  const [loading, setLoading] = useState(false);
  const [devProperties, setDevProperties] = useState([]);

  useEffect(() => {
    fetchDevProperty();
  }, []);  // Se ejecuta cuando el componente se monta

  const fetchDevProperty = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/development`);
      setDevProperties(response.data); // Asegúrate de acceder a `response.data`
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
      setLoading(false);
    }
  };

  console.log('Propiedades de desarrollos:', devProperties);

  return (
    <div className="mt-5 p-5">
      <Button as={Link} to="/" variant="primary" className="mt-3 w-100 custom-button">
        <FaArrowLeft className="me-2" />
        Volver al inicio
      </Button>

      {/* Mostrar la cantidad de resultados */}
      <p className="m-4">{devProperties.length} Resultados</p>

      <Row>
        {devProperties.map((devProperty) => (
          <Col key={devProperty.id} xs={12} sm={6} md={4} lg={4}>
            <DevelopmentItem development={devProperty} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Emprendimientos;
