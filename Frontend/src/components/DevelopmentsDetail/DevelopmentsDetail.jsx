import React from 'react';
import { useLocation, Link, useNavigate} from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaBed, FaBath, FaCarAlt, FaHome, FaToilet, FaArrowLeft, FaCompass, FaRulerCombined, FaBuilding } from 'react-icons/fa';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaWhatsapp, FaEnvelope, FaPrint } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DevelopmentsDetail.css';  // Estilos personalizados

// Flechas personalizadas para el carrusel
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIos
      className={className}
      style={{
        ...style,
        width: 50,
        height: 50,
        display: 'block',
        color: 'white',
        right: 10,
        zIndex: 1,
        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1) 70%)',
        borderRadius: '50%',
        boxShadow: '0 0 50px rgba(255, 255, 255, 0.4)',
        padding: 13,
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIos
      className={className}
      style={{
        ...style,
        width: 50,
        height: 50,
        display: 'block',
        color: 'white',
        left: 10,
        zIndex: 1,
        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1) 70%)',
        borderRadius: '50%',
        boxShadow: '0 0 50px rgba(255, 255, 255, 0.4)',
        padding: 13,
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
    />
  );
};

const DevelopmentsDetail = () => {
  const location = useLocation();
  const { development } = location.state || {};  // Extraer 'development' desde 'location.state'
  console.log('Desarrollo:', development);
  if (!development) {
    return <div className="text-light">No se encontraron detalles del desarrollo.</div>;
  }

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Función para volver a la página anterior
  };

  const shareOnWhatsApp = () => {
    const message = `Mira esta propiedad: ${address}. Precio: ${operations[0].prices[0].currency} ${operations[0].prices[0].price} https://belga.com.ar/propiedad/${idTokko}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareByEmail = () => {
    const subject = `Interesante propiedad en ${address}`;
    const body = `Te comparto esta propiedad en ${address}. Precio: ${operations[0].prices[0].currency} ${operations[0].prices[0].price}. Mira más detalles aquí: https://belga.com.ar/propiedad/${idTokko}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handlePrint = () => {
    window.print(); // Abre la ventana de impresión del navegador
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container className="my-5 pt-5 text-light property-detail bg-dark">
      {/* Información del inmueble */}
      <button onClick={goBack} variant="primary" className="btn-go-back custom-button">
        <FaArrowLeft className="me-2" />
        Volver a la lista
      </button>
      <Row className="my-5 bg-dark shadow p-3">
        <Col md={12}>
          <div className="">
            <h1 className="display-5">{development.address}</h1>
          </div>
          <div>
            {development.operations && development.operations[0]?.prices[0] && (
              <h2 className="text-end fw-light">
                {development.operations[0].prices[0].currency === 'USD' ? 'USD' : 'ARS'}{' '}
                {development.operations[0].prices[0].price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </h2>
            )}
          </div>
          <Col md={12}>
          <hr className="my-3" />
        </Col>
        <h4>{development.location?.name}</h4>
        <div className="compartir-container mb-5">
            <span className="me-3">Enviar por:</span>
            <div>
            <FaWhatsapp
                className="mx-2"
                style={{ cursor: 'pointer' }}
                onClick={shareOnWhatsApp} // Manejador para compartir en WhatsApp
              />      
              <FaEnvelope
                className="mx-2"
                style={{ cursor: 'pointer' }}
                onClick={shareByEmail} // Manejador para compartir por correo
              />
               <FaPrint
                className="mx-2"
                style={{ cursor: 'pointer' }}
                onClick={handlePrint} // Manejador para imprimir
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Carrusel de imágenes */}
      <Row className="align-items-center">
        <Col>
          <Slider {...sliderSettings} className="image-wrapper-detail">
            {development.photos?.map((image, index) => (
              <div key={index} className="image-wrapper-detail">
                <img
                  src={image.image || "/path/to/default-image.jpg"}
                  alt={`Property Image ${index}`}
                  className="img-fluid rounded-3 mb-2 main-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>

      

      {/* Descripción y etiquetas */}
      <Row className="mt-3">
        <Col>
          {development.tags && development.tags.length > 0 && (
            <div className="property-tags bg-dark p-4 rounded-3 shadow">
              <h2 className="mb-4 text-light">Adicionales</h2>
              <Row>
                                {development.tags.map((tag, index) => (
                  <Col xs={6} key={index} className="tag-item bg-dark p-2 rounded mb-2">
                    {tag.name}
                  </Col>
                ))}
              </Row>
            </div>
          )}

          <div className="map-container bg-dark p-4 rounded-3 shadow mt-3">
            <h2 className="text-light">Ubicación</h2>
            <MapaInteractivo property={development} />
          </div>
        </Col>

        <Col>
          <div className="property-description bg-dark p-4 rounded-3 shadow">
            <h2 className="text-light">Descripción</h2>
            <p dangerouslySetInnerHTML={{ __html: development.description }}></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DevelopmentsDetail;