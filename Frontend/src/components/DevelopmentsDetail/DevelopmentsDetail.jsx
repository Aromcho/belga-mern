import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet-async';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaWhatsapp, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
import ContactForm from '../Forms/ContactForm/ContactForm';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DevelopmentsDetail.css';

// Flechas personalizadas para el carrusel (NO SE CAMBIA EL DISEÑO)
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

// Decodificar HTML en la descripción
const decodeHtmlEntities = (text) => {
  const element = document.createElement('div');
  if (text) {
    element.innerHTML = text;
    return element.textContent;
  }
  return text;
};
const goBack = () => {
  navigate(-1); // Función para volver a la página anterior
};

const shareOnWhatsApp = () => {
  const message = `Mira esta propiedad: ${development.address}.`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

const shareByEmail = () => {
  const subject = `Interesante propiedad en ${development.address}`;
  const body = `Te comparto esta propiedad en ${development.address}. Mira más detalles aquí.`;
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

const DevelopmentsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Estado inicial: usa el desarrollo si viene en el `state`
  const [development, setDevelopment] = useState(location.state?.development || null);
  const [loading, setLoading] = useState(!location.state?.development);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    // Si no hay datos del desarrollo en el `state`, carga desde el backend
    if (!development || development.id !== parseInt(id)) {
      const fetchDevelopment = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/development/${id}`);
          const data = await response.json();

          if (response.ok) {
            setDevelopment(data);
          } else {
            setError('Emprendimiento no encontrado');
          }
        } catch (error) {
          setError('Error al cargar el emprendimiento');
        } finally {
          setLoading(false);
        }
      };

      fetchDevelopment();
    }
  }, [id, development]);

  if (loading) {
    return <div className="text-light">Cargando...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}. Volviendo a la lista de emprendimientos...</p>
        <button onClick={() => navigate(-1)}>Volver a la lista</button>
      </div>
    );
  }

  const description = decodeHtmlEntities(development.description);

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
    <>
      <button onClick={goBack} className="btn-go-back-dev">
        <p className="me-2 p-5"><FaArrowLeft className="me-2" /> Volver a la lista</p>
      </button>
      <Container className="text-light property-dev-detail bg-black">
        {/* Información del inmueble */}
        <Row className="my-1 shadow p-3">
          <Col md={12}>
            <div className="">
              <h1 className="address-dev">{development.address}</h1>
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
            <div className="compartir-container ">
              <h4>{development.location?.name}</h4>
              <div>
                <span className="me-3">Enviar por:</span>
                <FaWhatsapp
                  className="mx-2"
                  style={{ cursor: 'pointer' }}
                  onClick={shareOnWhatsApp}  // Manejador para compartir en WhatsApp
                />
                <FaEnvelope
                  className="mx-2"
                  style={{ cursor: 'pointer' }}
                  onClick={shareByEmail}  // Manejador para compartir por correo
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Carrusel de imágenes */}
        <Row className="align-items-center">
          <Col>
            <Slider {...sliderSettings} className="image-wrapper-detail-dev">
              {development.photos?.map((image, index) => (
                <div key={index} className="image-wrapper-detail-dev">
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
        <Row className="">
          <Col md={6}>
            {development.tags && development.tags.length > 0 && (
              <div className="property-tags bg-black p-4 rounded-3 shadow">
                <h2 className="mb-4 text-light">Adicionales</h2>
                <Row>
                  {development.tags.map((tag, index) => (
                    <Col xs={6} key={index} className="tag-item bg-black p-2  mb-2">
                      {tag.name}
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>
          <Col md={6}>
            <div className="property-description bg-white p-4  shadow">
              <h2 className="text-black mb-2">Descripción</h2>
              <p className="text-black" dangerouslySetInnerHTML={{ __html: description }}></p>  {/* Descripción decodificada */}
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="map-container bg-black  rounded-3 shadow mt-5">
              <MapaInteractivo property={development} />
            </div>
          </Col>
        </Row>
      </Container>
      
      <ContactForm full className='mb-5' />
    </>
  );
};

export default DevelopmentsDetail;
