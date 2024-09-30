import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FiltersContext } from '../../context/FiltersContext';
import 'leaflet/dist/leaflet.css';
import "./Home.css";

import Title from "../../components/Title/Title.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import SearchHomeForm from "../../components/SearchHomeForm/SearchHomeForm.jsx";
import SocialSidebar from "../../components/SocialSidebar/SocialSidebar.jsx";
import SelectionListContainer from "../../components/SelectionListContainer/SelectionListContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import FormContact from "../../components/FormContact/FormContact.jsx";
import HomeMap from "../../components/HomeMap/HomeMap.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { filters, updateFilters } = useContext(FiltersContext);
  const [isMobile, setIsMobile] = useState(false); // Nuevo estado para detectar si es mobile

  useEffect(() => {
    // Función para verificar el tamaño de la pantalla
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 992); // Definir si es mobile con ancho <= 992px
    };

    checkIsMobile(); // Verificar en el primer renderizado

    // Agregar un listener para cambios de tamaño de pantalla
    window.addEventListener("resize", checkIsMobile);

    return () => {
      // Limpiar el listener al desmontar el componente
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/propertylist", { state: { filters } }); // Redirigir a la lista de propiedades
  };

  return (
    <div className="layout transparent">
      <div className="hero-wrapper">
        {!isMobile ? (
          <video autoPlay muted loop className="video" src="/home-video.mp4">
          </video>
        ) : (
          <img
            src="/Foto_Portada.jpg"
            alt="Portada"
            className="w-100 h-100 position-absolute top-0 start-0"
          />
        )}

        {/* Imagen de superposición que siempre cubre el video o la imagen */}
        <img
          src="/Frame 1.png"
          alt="Superposición PNG"
          className="overlay-image"
        />

        <div className="overlay"></div>
        <div className="hero">
          <SocialSidebar />
        </div>
        <div className="container-form-serch align--center">
          <SearchHomeForm formData={filters} setFormData={updateFilters} handleSubmit={handleSubmit} />
        </div>
      </div>

      <div className="seleccion-section">
        <div className="seleccion">
          <SocialSidebar color="red" />
          <BackToTop color="red" />
        </div>
        <div className="container seleccion--container">
          <Title
            title="NUESTRA SELECCIÓN"
            linkButton="/highlighted"
            buttonStyle="outline red"
          />
          <Button className="button--mobile" text="Ver más" type="outline red" link="/highlighted" />
          <div className="prop-list">
            <SelectionListContainer></SelectionListContainer>
          </div>
        </div>
      </div>

      <div className="inversion-section">
        <div className="inversion">
          <SocialSidebar color="black" />
          <BackToTop color="black" />
        </div>
        <div className="container inversion--container">
          <div className="inversion-list">
            <div className="inversion-item item--text">
              <Title
                title="TU PRÓXIMA INVERSIÓN"
                buttonStyle="outline black"
                vertical
                linkButton="/emprendimientos"
              />
            </div>
          </div>
          <Button className="button--mobile" text="Ver más" type="outline black" link="/emprendimientos" />
        </div>
      </div>

      <div className="contact-section">
        <FormContact />
      </div>
      
      <div className="mapa">
        <HomeMap/>
      </div>
    </div>
  );
};

export default Home;
