import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"; // Importar el hook
import { FiltersContext } from '../../context/FiltersContext'; // Importar el contexto
import "./Home.css";

import Title from "../../components/Title/Title.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import SearchHomeForm from "../../components/SearchHomeForm/SearchHomeForm.jsx";
import SocialSidebar from "../../components/SocialSidebar/SocialSidebar.jsx";
import SelectionListContainer from "../../components/SelectionListContainer/SelectionListContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import FormContact from "../../components/FormContact/FormContact.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { filters, updateFilters } = useContext(FiltersContext); // Obtener el estado y la función de actualización

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/propertylist", { state: { filters} }); // Redirigir a la lista de propiedades
  };

  return (
    <div className="layout transparent">
      <div className="hero-wrapper">
        <video autoPlay muted loop className="video">
          <source src="/home-video.mp4" type="video/mp4" />
        </video>
        <img
          src="/Frame 1.png"
          alt="Superposición PNG"
          className="w-100 h-100 position-absolute top-0 start-0"
        />
        <img src="/Foto_Portada.jpg" alt="Portada" className="background-image" />
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
    </div>
  );
};

export default Home;
