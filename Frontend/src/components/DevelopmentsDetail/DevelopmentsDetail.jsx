import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaBed, FaBath, FaCarAlt, FaHome, FaToilet, FaArrowLeft, FaCompass, FaRulerCombined, FaBuilding } from 'react-icons/fa';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
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
    <Container className="my-5 text-light property-detail">
      {/* Información del inmueble */}
      <Row className="my-3">
        <Col md={12}>
          <div className="p-3 bg-dark rounded-3 shadow">
            <Button as={Link} to="/emprendimientos" variant="light" className="mt-3 w-100 custom-button">
              <FaArrowLeft className="me-2" />
              Volver a la lista
            </Button>
            <h1 className="display-5">{development.address}</h1>
            <h4>{development.location?.name}</h4>
            {development.operations && development.operations[0]?.prices[0] && (
              <h2 className="text-end fw-light">
                {development.operations[0].prices[0].currency === 'USD' ? 'USD' : 'ARS'}{' '}
                {development.operations[0].prices[0].price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </h2>
            )}
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
              <div className="tags-container d-flex flex-wrap gap-2 justify-content-start">
                {development.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tag-badge bg-light text-dark px-3 py-2 rounded-pill shadow-sm"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: '1px solid #ddd',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
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