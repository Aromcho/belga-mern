import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DevelopmentItem from "../../components/DevelopmentsItem/DevelopmentsItem";
import axios from "axios";
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Skeleton from '@mui/material/Skeleton';
import './Emprendimientos.css'; // Asegúrate de tener un archivo CSS para los estilos

const Emprendimientos = () => {
  const [loading, setLoading] = useState(true);
  const [devProperties, setDevProperties] = useState([]);

  useEffect(() => {
    fetchDevProperty();
  }, []);

  const fetchDevProperty = async () => {
    try {
      const response = await axios.get(`/api/development`);
      setTimeout(() => {
        setDevProperties(response.data);
        setLoading(false);
      }, 100); // Retraso de 8 segundos
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 p-5">
      <Button as={Link} to="/" variant="primary" className="mt-3 w-100 custom-button">
        <FaArrowLeft className="me-2" />
        Volver al inicio
      </Button>

      <p className="m-4">{loading ? "Cargando..." : `${devProperties.length} Resultados`}</p>

      <Row>
        {(loading ? Array.from(new Array(6)) : devProperties).map((devProperty, index) => (
          <Col key={devProperty?.id || index} xs={12} sm={6} md={4} lg={4} className="mb-4">
            {loading ? (
              // Contenedor oscuro para el Skeleton
              <div className="skeleton-container">
                <Skeleton variant="rectangular" height={400} width="100%" />
                <Skeleton variant="text" height={40} className="mt-2" />
                <Skeleton variant="text" height={20} />
              </div>
            ) : (
              <DevelopmentItem development={devProperty} />
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Emprendimientos;
