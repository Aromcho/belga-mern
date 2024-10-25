import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaArrowLeft } from 'react-icons/fa';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
import Skeleton from '@mui/material/Skeleton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DevelopmentsDetail.css'; // Estilos personalizados

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
  const { development } = location.state || {};
  const [loading, setLoading] = useState(true); // Estado de carga

  const navigate = useNavigate();

  useEffect(() => {
    // Simula la carga de datos
    const timer = setTimeout(() => {
      setLoading(false); // Cambia el estado de carga después de 3 segundos
    }, 10000);
    return () => clearTimeout(timer); // Limpia el timer en caso de que el componente se desmonte
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const shareOnWhatsApp = () => {
    const message = `Mira esta propiedad: ${development?.address}. Precio: ${development?.operations[0].prices[0].currency} ${development?.operations[0].prices[0].price} https://belga.com.ar/propiedad/${development?.idTokko}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareByEmail = () => {
    const subject = `Interesante propiedad en ${development?.address}`;
    const body = `Te comparto esta propiedad en ${development?.address}. Precio: ${development?.operations[0].prices[0].currency} ${development?.operations[0].prices[0].price}. Mira más detalles aquí: https://belga.com.ar/propiedad/${development?.idTokko}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handlePrint = () => {
    window.print();
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
  };

  if (!development && !loading) {
    return <div className="text-light">No se encontraron detalles del desarrollo.</div>;
  }

  return (
    <Container className="my-5 pt-5 text-light property-detail bg-dark">
      <button onClick={goBack} variant="primary" className="btn-go-back custom-button">
        <FaArrowLeft className="me-2" />
        Volver a la lista
      </button>
      <Row className="my-5 bg-dark shadow p-3">
        <Col md={12}>
          {loading ? (
            <Skeleton variant="text" height={60} width="80%" />
          ) : (
            <h1 className="display-5">{development.address}</h1>
          )}
          {loading ? (
            <Skeleton variant="text" height={40} width="30%" />
          ) : (
            development.operations && development.operations[0]?.prices[0] && (
              <h2 className="text-end fw-light">
                {development.operations[0].prices[0].currency === 'USD' ? 'USD' : 'ARS'}{' '}
                {development.operations[0].prices[0].price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </h2>
            )
          )}
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col>
          {loading ? (
            <Skeleton variant="rectangular" height={400} width="100%" />
          ) : (
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
          )}
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          {loading ? (
            <Skeleton variant="rectangular" height={200} width="100%" />
          ) : (
            <div className="property-tags bg-dark p-4 rounded-3 shadow">
              <h2 className="mb-4 text-light">Adicionales</h2>
              <Row>
                {development.tags?.map((tag, index) => (
                  <Col xs={6} key={index} className="tag-item bg-dark p-2 rounded mb-2">
                    {tag.name}
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {loading ? (
            <Skeleton variant="rectangular" height={200} width="100%" className="mt-3" />
          ) : (
            <div className="map-container bg-dark p-4 rounded-3 shadow mt-3">
              <h2 className="text-light">Ubicación</h2>
              <MapaInteractivo property={development} />
            </div>
          )}
        </Col>

        <Col>
          {loading ? (
            <Skeleton variant="rectangular" height={200} width="100%" />
          ) : (
            <div className="property-description bg-dark p-4 rounded-3 shadow">
              <h2 className="text-light">Descripción</h2>
              <p dangerouslySetInnerHTML={{ __html: development.description }}></p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DevelopmentsDetail;
