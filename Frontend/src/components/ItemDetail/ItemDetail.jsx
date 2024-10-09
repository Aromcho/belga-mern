import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaBed, FaBath, FaCarAlt, FaHome, FaToilet, FaCompass, FaRulerCombined, FaBuilding, FaArrowLeft, FaHeart, FaWhatsapp, FaEnvelope, FaPrint } from 'react-icons/fa';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
import Title from '../Title/Title';
import SelectionListContainer from '../SelectionListContainer/SelectionListContainer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ItemDetail.css';
import { HeartIcon, MailIcon, PrintIcon, WhatsappIcon } from '../Icons/Icons';

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
  const { address, suite_amount, location, operations, photos, type, tags, rich_description } = property;
  const barrio = location.name;
  const property_type = type.name;

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
      {/* Botón de regreso */}
      <Button as={Link} to="/propertylist" variant="primary" className="mt-3 w-100 custom-button">
        <FaArrowLeft className="me-2" />
        Volver a la lista
      </Button>

      {/* Encabezado */}
      <Row className="encabezado my-5">
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h4 className="display-6 me-3">{address}</h4>
              <FavoriteBorderIcon className="icon" />
            </div>
            <h2 className="fw-light">
              {operations[0].prices[0].currency === 'USD' ? 'Venta USD' : 'Venta ARS'}{' '}
              {operations[0].prices[0].price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </h2>
          </div>
        </Col>
        <Col md={12}>
          <hr className="my-3" />
        </Col>
        <Col className="d-flex justify-content-between align-items-center">
          <h5 className="text-muted">{property_type} en {barrio}</h5>
          <div className="d-flex align-items-center">
            <span className="me-3">Enviar por:</span>
            < WhatsappIcon className="mx-2" style={{ cursor: 'pointer' }} />
            < MailIcon className="mx-2 " style={{ cursor: 'pointer' }} />
            < PrintIcon className="mx-2" style={{ cursor: 'pointer' }} />
          </div>
        </Col>
      </Row>

      {/* Carrusel de imágenes */}
      <Row className="align-items-center">
        <Col>
          <Slider {...sliderSettings} className="image-wrapper-detail">
            {photos?.map((image, index) => (
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

      {/* Detalles de la propiedad */}
      <Row className="mt-3">
        <Col md={6}>
          <div className="property-features bg-white p-4 rounded-3">
            <div className="property-info row">
              {/* Agrega más detalles aquí según sea necesario */}
            </div>
          </div>
        </Col>

        <Col md={6}>
          <Row className="property-info p-4">
            <h2 className="mb-4 text-dark">Información</h2>
            <div className="info-details d-flex flex-column gap-4">
              {/* Añadir más detalles */}
            </div>
          </Row>
        </Col>
      </Row>

      {/* Descripción y etiquetas */}
      <Row className="mt-3">
        <Col>
          {tags && tags.length > 0 && (
            <div className="property-tags bg-white p-4 rounded-3">
              <h2 className="mb-4">Adicionales</h2>
              <Row>
                {tags.map((tag, index) => (
                  <Col xs={6} key={index} className="tag-item bg-light p-2 rounded mb-2">
                    {tag.name}
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>

        <Col>
          <div className="property-description bg-white p-4 rounded-3 ">
            <h2>Descripción</h2>
            <p dangerouslySetInnerHTML={{ __html: rich_description }}></p>
          </div>
        </Col>
      </Row>
      
      {/* Ubicación */}
      <Row className="mt-3">
        <h2>Ubicación</h2>
        <MapaInteractivo property={property} />
      </Row>

      {/* Nuestra Selección */}
      <Row>
        <div className="container seleccion--container mt-5 pt-5">
          <Title title="PROPIEDADES SIMILARES" linkButton="/highlighted" buttonStyle="outline red" />
          <Button as={Link} to="/propertylist" className="button--mobile" text="Ver más" type="outline red" />
          <div className="prop-list">
            <SelectionListContainer />
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default ItemDetail;
