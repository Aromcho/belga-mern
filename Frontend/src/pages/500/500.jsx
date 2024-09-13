import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
//import Layout from "../../components/Layout/Layout.jsx";
import "./500.css"; // Importar el CSS de forma clásica

const Error500 = () => {
  return (
      <div className="error-container">
        <Container>
          <div className="row-content bold">
            <Link to="/">
              <ArrowBackIcon className="left" /> VOLVER AL INICIO
            </Link>
          </div>
        </Container>

        <Container>
          <div className="wrapper-content">
            <div className="left-content">
              <img src="/images/500_image.svg" alt="Error 500" className="img" />
            </div>
            <div className="right-content">
              <div className="right-content-wrapper">
                <div className="top-text">
                  Estamos trabajando para que puedas continuar con tu búsqueda.
                </div>
                <div className="separator black"></div>
                <div className="text">Mientras tanto...</div>
                <div className="separator red"></div>
                <Button
                  className="button--square"
                  text="Ver instagram"
                  type="secondary shine"
                  link="https://www.instagram.com"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
  );
};

export default Error500;
