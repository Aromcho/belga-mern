import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
import { FaBed, FaBath, FaCarAlt, FaHome, FaToilet } from 'react-icons/fa';
import { FaCompass, FaRulerCombined, FaBuilding } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ItemDetail.css';

// Custom arrows for the carousel
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
        background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)',
        borderRadius: '50%',
        boxShadow: '0 0 50px rgba(0, 0, 0, 0.4)',
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
        background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)',
        borderRadius: '50%',
        boxShadow: '0 0 50px rgba(0, 0, 0, 0.4)',
        padding: 13,
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
    />
  );
};

const ItemDetail = ({ property }) => {
  const [propertyApi, setPropertyApi] = useState(null);
  const idTokko = property?._id || ''; // Verificación de seguridad en case _id no esté definido
  const total_surface = property?.total_surface || 0;
  const roofed_surface = property?.roofed_surface || 0;
  const room_amount = property?.room_amount || 0;
  const address = property?.address || 'Dirección no disponible';
  const bathroom_amount = property?.bathroom_amount || 0;
  const bedrooms = property?.suite_amount || 0;
  const parking_lot_amount = property?.parking_lot_amount || 0;
  const age = property?.age || 0;
  const toilet_amount = property?.toilet_amount || 0;
  const barrio = property?.location?.name || 'Ubicación no disponible';
  const tags = property?.tags?.length ? property.tags : [];

  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`/api/api/${idTokko}`);
      const propertyData = response.data;
      setPropertyApi(propertyData);
    } catch (error) {
      console.error('Error al obtener los detalles de la propiedad:', error);
    }
  };

  useEffect(() => {
    if (idTokko) {
      fetchPropertyDetails();
    }
  }, [idTokko]);

  if (!propertyApi) {
    return <div>Loading...</div>;
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
    <Container className="my-5 text-dark property-detail">
      {/* Información del inmueble */}
      <Row className="my-3">
        <Col md={12}>
          <div className="p-3 bg-white rounded-3 shadow">
            <Button as={Link} to="/propertylist" variant="primary" className="mt-3 w-100 custom-button">
              <FaArrowLeft className="me-2" />
              Volver a la lista
            </Button>
            <h1 className="display-5">{address}</h1>
            <h4>{barrio}</h4>
            {propertyApi.operations && propertyApi.operations[0]?.prices[0] && (
              <h2 className="text-end fw-light">
                {propertyApi.operations[0].prices[0].currency === 'USD' ? 'USD' : 'ARS'}{' '}
                {propertyApi.operations[0].prices[0].price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </h2>
            )}
          </div>
        </Col>
      </Row>

      {/* Carrusel de imágenes */}
      <Row className="align-items-center">
        <Col>
          <Slider {...sliderSettings} className="image-wrapper-detail">
            {propertyApi.photos?.map((image, index) => (
              <div key={index} className="image-wrapper-detail">
                <img
                  src={image.image || '/path/to/default-image.jpg'}
                  alt={`Property Image ${index}`}
                  className="img-fluid rounded-3 mb-2 main-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6}>
          <div className="property-features bg-white p-4 rounded-3 shadow">
            <div className="property-info row">
              {age > 0 && (
                <Col xs={4} className="info-item text-center">
                  <FaHome className="icon" />
                  <p className="text-muted">Antigüedad</p>
                  <span className="text-muted">{age} años</span>
                </Col>
              )}
              {total_surface > 0 && (
                <Col xs={4} className="info-item text-center">
                  <FaRulerCombined className="icon me-3" />
                  <span className="text-muted">{total_surface}</span>
                  <p className="text-muted">M2 Totales</p>
                </Col>
              )}
              {bedrooms > 0 && (
                <Col xs={4} className="info-item text-center">
                  <FaBed className="icon" />
                  <p className="text-muted">Dormitorios</p>
                  <span className="text-muted">{bedrooms}</span>
                </Col>
              )}
              {bathroom_amount > 0 && (
                <Col xs={4} className="info-item text-center">
                  <FaBath className="icon" />
                  <p className="text-muted">Baños</p>
                  <span className="text-muted">{bathroom_amount}</span>
                </Col>
              )}
              {parking_lot_amount > 0 && (
                <Col xs={4} className="info-item text-center">
                  <FaCarAlt className="icon" />
                  <p className="text-muted">Cochera</p>
                  <span className="text-muted">{parking_lot_amount}</span>
                </Col>
              )}
              {toilet_amount > 0 && (
                <Col xs={4} className="info-item text-center">
                  <FaToilet className="icon" />
                  <p className="text-muted">Toilettes</p>
                  <span className="text-muted">{toilet_amount}</span>
                </Col>
              )}
            </div>
          </div>
        </Col>

        <Col md={6}>
          <Row className="property-info p-4">
            <h2 className="mb-4 text-dark">Información</h2>
            <div className="info-details d-flex flex-column gap-4">
              {propertyApi.disposition && (
                <div className="info-item-b p-3 d-flex align-items-center rounded shadow hover-effect">
                  <FaRulerCombined className="icon me-3" />
                  <p className="mb-0">
                    <strong>Disposición: </strong>{propertyApi.disposition}
                  </p>
                </div>
              )}
              {propertyApi.orientation && (
                <div className="info-item-b p-3 d-flex align-items-center rounded shadow hover-effect">
                  <FaCompass className="icon me-3" />
                  <p className="mb-0">
                    <strong>Orientación: </strong>{propertyApi.orientation}
                  </p>
                </div>
              )}
              {propertyApi.property_condition && (
                <div className="info-item-b p-3 d-flex align-items-center rounded shadow hover-effect">
                  <FaBuilding className="icon me-3" />
                  <p className="mb-0">
                    <strong>Condición: </strong>{propertyApi.property_condition}
                  </p>
                </div>
              )}
            </div>
          </Row>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Row className="mt-3">
            <Col>
              {tags.length > 0 && (
                <div className="property-tags bg-white p-4 rounded-3 shadow">
                  <h2 className="mb-4">Etiquetas</h2>
                  <div className="tags-container d-flex flex-wrap gap-2 justify-content-start">
                    {tags.map((tag, index) => (
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

              <div className="map-container bg-white p-4 rounded-3 shadow mt-3">
                <h2>Ubicación</h2>
                <MapaInteractivo property={property} />
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <div className="property-description bg-white p-4 rounded-3 shadow">
            <h2>Descripción</h2>
            <p dangerouslySetInnerHTML={{ __html: propertyApi.rich_description }}></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetail;
