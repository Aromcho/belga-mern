import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ContactForm from "../../components/Forms/ContactForm/ContactForm.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { PATHS } from "../../../config/index.js";
import './BusquedasGuardadas.css';

const BusquedasGuardadas = observer(() => {
  const [savedSearches, setSavedSearches] = useState([]);

  const redirectToPropertyList = () => {
    window.location.href = PATHS.PROPERTY_LIST;
  };

  // Cargar las búsquedas guardadas desde las cookies
  useEffect(() => {
    const fetchSavedSearches = async () => {
      try {
        const response = await axios.get('/api/cookies/get-searches');
        setSavedSearches(response.data.searches); // Guardamos las búsquedas en el estado
        console.log("Búsquedas guardadas:", response.data.searches);
      } catch (error) {
        console.error("Error al cargar búsquedas guardadas:", error);
      }
    };
    fetchSavedSearches();
  }, []);

  return (
    <div className="busquedas-container">
      <Container>
        <div className="back-wrapper">
          <Link to={PATHS.ROOT} className="back--link">
            <ArrowBackIcon />
            Volver al inicio
          </Link>
        </div>
      </Container>

      <Container>
        

        {savedSearches.length === 0 ? (
          <>
          <div className="img-cont-busquedas">
          <img src="/images/empty_img_plus.gif" alt="" />
        </div>
            <Container>
              <h3 className="subtitle-busquedas">Tené a mano tus búsquedas.</h3>
            </Container>
            <Container className="img-cont-busquedas">
              <button onClick={redirectToPropertyList} className="btn-busquedas-guardadas">
                AGREGA TUS BUSQUEDAS
              </button>
            </Container>
            
          </>
        ) : (
          <>
            <Container>
              <h2 className="title-busquedas">Tus Búsquedas Guardadas</h2>
            </Container>

            <div className="busquedas-list">
              {savedSearches.map((search) => (
                <div key={search.id} className="busqueda-card">
                  <Row>
                  <Col className="m-5 p-5">
                  <h4><strong>Tipo de Operación:</strong> {search.operation_type.join(', ')}</h4>
                  <p><strong>Tipo de Propiedad:</strong> {search.property_type.join(', ')}</p>
                  <p><strong>Cocheras:</strong> {search.min_garages} - {search.max_garages}</p>
                  <p><strong>Búsqueda:</strong> {search.searchQuery}</p>
                  </Col>
                  <Col className="m-5 p-5">
                  <p><strong>Habitaciones:</strong> {search.min_rooms} - {search.max_rooms}</p>
                  <p><strong>Precio:</strong> {search.price_from} - {search.price_to}</p>
                  </Col>
                  </Row>
                </div>
              ))}
            </div>

            
          </>
        )}

        <div className="form-wrapper">
          <ContactForm full />
        </div>
      </Container>
    </div>
  );
});

export default BusquedasGuardadas;
