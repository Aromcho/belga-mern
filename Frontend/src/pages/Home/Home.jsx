import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // Corregir el import de Link
import { FiltersContext } from '../../context/FiltersContext';
import 'leaflet/dist/leaflet.css';
import "./Home.css";
import FooterInfo from "../../components/FooterInfo/FooterInfo.jsx"
import Title from "../../components/Title/Title.jsx";
import BackToTop from "../../components/BackToTop/BackToTop.jsx";
import SearchHomeForm from "../../components/SearchHomeForm/SearchHomeForm.jsx";
import SocialSidebar from "../../components/SocialSidebar/SocialSidebar.jsx";
import SelectionListContainer from "../../components/SelectionListContainer/SelectionListContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import ContactForm from "../../components/Forms/ContactForm/ContactForm.jsx";
import HomeMap from "../../components/HomeMap/HomeMap.jsx";
import { Container } from "react-bootstrap";
import InversionSection from "../../components/InvertionHome/InvertionHome.jsx";


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

  const data = [
    {
      id: 1,
      name: "Casa Central LA IMPRENTA",
      direction: "Gorostiaga 1601",
      direction_b: "(Esquina Migueletes)",
      loc: { lat: -34.5652519, lon: -58.4364415 },
    },
    {
      id: 2,
      name: "BELGRANO C",
      direction: "Juramento 2102",
      direction_b: "1426 CABA",
      loc: { lat: -34.56051641836724, lon: -58.45384234503877 },
    },
    {
      id: 3,
      name: "BELGRANO R",
      direction: "Superí 1485",
      direction_b: "(Esquina Av. de los Incas)",
      loc: { lat: -34.5735786974359, lon: -58.46109912564103 },
    },
  ];
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
          <Button as={Link} to="/propertylist" className="button--mobile" text="Ver más" type="outline red" />
          <div className="prop-list">
            <SelectionListContainer></SelectionListContainer>
          </div>
        </div>
      </div>
      {/*inversion sectin*/}

      <InversionSection/>
      <div className="contact-section">
        <FooterInfo/>
        <HomeMap/>
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
