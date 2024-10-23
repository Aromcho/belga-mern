import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
//import { useStore } from "../../store/UserStore.jsx";
import ContactForm from "../../components/Forms/ContactForm/ContactForm.jsx";
//import BusquedaCard from "../components/BusquedaCard/BusquedaCard";
//import Status from "../components/Status/Status";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Icono de flecha hacia atrás
import { Container } from "react-bootstrap";
import { PATHS } from "../../../config/index.js";
import './BusquedasGuardadas.css'; // Asegúrate de que el archivo CSS está bien importado

const BusquedasGuardadas = observer(() => {
  
  const { saveSearch } = [1];
  return (
    <>
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
          {saveSearch === 0 ? (
            <Status
              img="/images/empty_img_plus.gif"
              text="Tené a mano tus búsquedas."
              textButton="AGREGÁ TUS BÚSQUEDAS"
              buttonStyle="secondary shine"
              linkButton={PATHS.VENTA}
            />
          ) : (
            <>
              <Container>
                <h2 className="title-busquedas">TUS BÚSQUEDAS GUARDADAS</h2>
              </Container>

              <div className="busquedas-list">
                
              </div>

              <Container>
                <h3 className="subtitle-busquedas">Encontrá lo que estás buscando.</h3>
              </Container>

              <div className="form-wrapper">
                <ContactForm full />
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
});

export default BusquedasGuardadas;
