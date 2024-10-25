import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaBed, FaBath, FaCarAlt, FaToilet, FaCompass, FaRulerCombined, FaBuilding, FaArrowLeft, FaWhatsapp, FaEnvelope, FaPrint } from 'react-icons/fa';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
import Title from '../Title/Title';
import RelatedListContainer from '../RelatedListContainer/RelatedListContainer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ItemDetail.css';
import Print from '../Print/Print';
import FormContact from '../FormContact/FormContact';
import { HeartIcon, MailIcon, PrintIcon, WhatsappIcon } from '../Icons/Icons';
import VenderForm from '../Forms/VenderForm/VenderForm';

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
  const printRef = useRef();

  const { suite_amount, location, photos, type, rich_description } = property;

  console.log('Propiedad:', property);  
  const videos = Array.isArray(property.videos) ? property.videos : [];
  const idTokko = property.id;
  const total_surface = property.total_surface;
  const roofed_surface = property.roofed_surface;
  const room_amount = property.room_amount;
  const address = property.address;
  const bathroom_amount = property.bathroom_amount;
  const bedrooms = property.suite_amount;
  const parking_lot_amount = property.parking_lot_amount;
  const age = property.age;
  const toilet_amount = property.toilet_amount;
  const barrio = property.location ? property.location.name : '';
  const tags = property.tags;
  const property_type = property.type ? property.type.name : '';
  const operations = property.operations && property.operations[0] ? property.operations : [];
  
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
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const sliderSettings = {
    dots: false, // Desactiva los puntitos
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
      <button onClick={goBack} variant="primary" className="btn-go-back custom-button">
        <FaArrowLeft className="me-2" />
        Volver a la lista
      </button>

      {/* Encabezado */}
      <Row className="encabezado my-5">
        <Col md={12}>
          <div className="nombre-precio-container">
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
        <Col className="barrio-compartir-container">
          <h5 className="text-muted mt">{property_type} en {barrio}</h5>
          <div className="compartir-container">
            <span className="me-3">Enviar por:</span>
            <div>
              <FaWhatsapp
                className="mx-2"
                style={{ cursor: 'pointer' }}
                onClick={shareOnWhatsApp} // Manejador para compartir en WhatsApp
              />
              <MailIcon
                className="mx-2"
                style={{ cursor: 'pointer' }}
                onClick={shareByEmail} // Manejador para compartir por correo
              />
              <PrintIcon
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
            {videos.map((video, index) => (
              <div key={index} className="video-wrapper-detail">
                <iframe
                  src={video.player_url}
                  title={`Video ${index}`}
                  className="img-fluid rounded-3 mb-2 main-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  allowFullScreen
                />
              </div>
            ))}
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
        {age > 0 && (
          <Col xs={4} className="info-item text-center">
            <img className="icon-image" src='/images/icons/prop_antiguedad.svg' alt="Antigüedad" />
            <p className="text-muted">Antigüedad</p>
            <span className="text-muted">{age === 0 ? 'A estrenar' : `${age} años`}</span>
          </Col>
        )}
        {total_surface > 0 && (
          <Col xs={4} className="info-item text-center">
            <img className="icon-image" src='/images/icons/prop_m2.svg' alt="Superficie Total" />
            <p className="text-muted">M2 Totales</p>
            <span className="text-muted">{total_surface}</span>
          </Col>
        )}
        {bedrooms > 0 && (
          <Col xs={4} className="info-item text-center">
            <img className="icon-image" src='/images/icons/prop_cuarto.svg' alt="Dormitorios" />
            <p className="text-muted">{bedrooms > 1 ? 'Dormitorios' : 'Dormitorio'}</p>
            <span className="text-muted">{bedrooms}</span>
          </Col>
        )}
        {bathroom_amount > 0 && (
          <Col xs={4} className="info-item text-center">
            <img className="icon-image" src='/images/icons/prop_ducha.svg' alt="Baños" />
            <p className="text-muted">{bathroom_amount > 1 ? 'Baños' : 'Baño'}</p>
            <span className="text-muted">{bathroom_amount}</span>
          </Col>
        )}
        {parking_lot_amount > 0 && (
          <Col xs={4} className="info-item text-center">
            <img className="icon-image" src='/images/icons/prop_cochera.svg' alt="Cochera" />
            <p className="text-muted">{parking_lot_amount > 1 ? 'Cocheras' : 'Cochera'}</p>
            <span className="text-muted">{parking_lot_amount}</span>
          </Col>
        )}
        {toilet_amount > 0 && (
          <Col xs={4} className="info-item text-center">
            <img className="icon-image" src='/images/icons/prop_toilette.svg' alt="Toilettes" />
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
              {property.disposition && (
                <div className="info-item-b p-3 d-flex align-items-center rounded shadow hover-effect">
                  <FaRulerCombined className="icon me-3" />
                  <p className="mb-0">
                    <strong>Disposición: </strong>{property.disposition}
                  </p>
                </div>
              )}
              {property.orientation && (
                <div className="info-item-b p-3 d-flex align-items-center rounded shadow hover-effect">
                  <FaCompass className="icon me-3" />
                  <p className="mb-0">
                    <strong>Orientación: </strong>{property.orientation}
                  </p>
                </div>
              )}
              {property.property_condition && (
                <div className="info-item-b p-3 d-flex align-items-center rounded shadow hover-effect">
                  <FaBuilding className="icon me-3" />
                  <p className="mb-0">
                    <strong>Condición: </strong>{property.property_condition}
                  </p>
                </div>
              )}
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
          <div className="property-description bg-white p-4 rounded-3">
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
          <div className="prop-list">
          <RelatedListContainer
         id={idTokko}
         price={operations[0].prices[0].price}
         location={barrio}
         propertyType={property_type}
      />
          </div>
        </div>
      </Row>

      {/* Componente Print */}
      <div ref={printRef} className="d-none">
        <Print property={property} />
      </div>
      <div className='form-detail-container'>
        <VenderForm />
      </div>
    </Container>
  );
};

export default ItemDetail;
