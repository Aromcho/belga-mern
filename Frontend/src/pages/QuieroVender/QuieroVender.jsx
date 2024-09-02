import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout.jsx";
import { ArrowBackIcon } from "../../components/Icons/Icons.jsx";
import VenderForm from "../../components/Forms/VenderForm/VenderForm.jsx"
//import { getWindowDimensions } from "../../helpers/helpers.js";
import "./QuieroVender.css"; // Importar el CSS de forma clásica

const QuieroVender = () => {
  /* Handle resize screen */
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimensions && windowDimensions.width <= 1100;

  return (
    <Layout>
      <div className="quiero-vender-container">
        <div className="back-wrapper">
          <Link to="/">
            <ArrowBackIcon />
            Volver al inicio
          </Link>
        </div>

        <div className="form-wrapper">
          <VenderForm className={isMobile ? "" : "full"} />
        </div>
      </div>
    </Layout>
  );
};

export default QuieroVender;
