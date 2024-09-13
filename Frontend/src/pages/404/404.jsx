import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
//import Layout from "../../components/Layout/Layout.jsx";
import "./404.css"; // Importar el CSS de forma clásica

const Error404 = () => {
  return (
      <div className="error-container">
        <div className="container">
          <div className="row-content bold">
            <Link to="/">
              <ArrowBackIcon className="left" /> VOLVER AL INICIO
            </Link>
          </div>
        </div>

        <div className="container">
          <div className="wrapper-content">
            <div className="wrapper-image">
              <img src="/images/404_image.svg" className="image" alt="Error 404" />
            </div>
            <div className="squares-wrapper">
              <div className="square red"></div>
              <div className="square black"></div>

              <div className="text-wrapper">
                <div className="top-text">Ups, no encontramos esta propiedad pero...</div>
                <div className="text">Lo que buscás está a la vuelta de la esquina.</div>
              </div>

              <div className="button-wrapper">
                <Button
                  className="button--square"
                  text="Encontralo Acá"
                  type="secondary shine"
                  link="/venta"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Error404;
