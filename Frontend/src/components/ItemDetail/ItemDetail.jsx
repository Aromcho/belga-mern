import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaBed, FaBath, FaCarAlt, FaHome, FaToilet, FaCompass, FaRulerCombined, FaBuilding, FaArrowLeft, FaHeart, FaWhatsapp, FaEnvelope, FaPrint } from 'react-icons/fa';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
import Title from '../Title/Title';
import SelectionListContainer from '../SelectionListContainer/SelectionListContainer';
import Button from '../Button/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ItemDetail.css';
import Print from '../Print/Print';
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
  const printRef = useRef();

  const { suite_amount, location, photos, type, rich_description } = property;

  console.log('Propiedad:', property);  
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
  const barrio = property.location.name;
  const tags = property.tags;
  const property_type = property.type.name;
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(237 23)"><rect width="24" height="24" transform="translate(-237 -23)" fill="none"/><path d="M15.795,7.963l-2.467-2.65V1.33h-2.39V2.923L8.144.157a.315.315,0,0,0-.443,0L.066,7.991a.315.315,0,0,0,.227.553H1.687v5.372H6.76V9.44H9.15v4.476h5.073V8.544h1.339a.315.315,0,0,0,.232-.581Zm-1.6-.077h-.642V13.2H9.726V8.771H6.185V13.2H2.351V7.886h-1.3L7.917.832l2.562,2.584,1.012,1V1.988h1.184V5.662l2.108,2.213Z" transform="translate(-232.957 -18.066)"/></g></svg>
                  <p className="text-muted">Antigüedad</p>
                  <span className="text-muted">{age} años</span>
                </Col>
              )}
              {total_surface > 0 && (
                <Col xs={4} className="info-item text-center">
                  <span className="text-muted">{total_surface}</span>
                  <p className="text-muted">M2 Totales</p>
                </Col>
              )}
              {bedrooms > 0 && (
                <Col xs={4} className="info-item text-center">
<img className="card-icons" src='/images/icons/prop_cuarto.svg' />                  <p className="text-muted">Dormitorios</p>
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
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="a"><rect width="20.644" height="8.135" fill="#fff"/></clipPath></defs><g transform="translate(-152 91)"><rect width="24" height="24" transform="translate(152 -91)" fill="none"/><g transform="translate(154 -83)" clip-path="url(#a)"><path d="M2.623,6.881H.337a.315.315,0,0,1-.31-.315V5a.309.309,0,0,1,.088-.221l1.1-1.091-1.15-2.3A.31.31,0,0,1,.337.939H2.53a.31.31,0,0,1,.261.138l.492.727L7.214.221A3.121,3.121,0,0,1,8.374,0h2.517a2.2,2.2,0,0,1,1.425.526l1.573,1.352h2.949a3.9,3.9,0,0,1,3.814,3.057.315.315,0,0,1-.034.231l-.939,1.563a.319.319,0,0,1-.27.152H18.033a1.878,1.878,0,0,1-3.539,0H6.137a1.878,1.878,0,0,1-3.539,0Zm-.108-.629a1.878,1.878,0,0,1,3.75,0H14.4a1.878,1.878,0,1,1,3.755,0h1.071l.782-1.3A3.279,3.279,0,0,0,16.833,2.5H13.776a.354.354,0,0,1-.207-.074L11.908,1A1.553,1.553,0,0,0,10.891.619H8.374A2.5,2.5,0,0,0,7.445.8L3.257,2.472a.315.315,0,0,1-.378-.113l-.531-.8H.829l1.027,2.05a.314.314,0,0,1-.059.359L.637,5.127V6.247ZM4.393,7.506a1.253,1.253,0,1,0-.886-.367A1.253,1.253,0,0,0,4.393,7.506Zm11.885,0a1.253,1.253,0,1,0-.886-.367A1.254,1.254,0,0,0,16.278,7.506Z" transform="translate(-0.014 0)"/></g></g></svg>                  <p className="text-muted">Cochera</p>
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

      {/* Componente Print */}
      <div ref={printRef} className="d-none">
        <Print property={property} />
      </div>

    </Container>
  );
};

export default ItemDetail;