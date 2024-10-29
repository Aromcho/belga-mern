import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaBed, FaBath, FaCarAlt, FaToilet, FaCompass, FaRulerCombined, FaBuilding, FaArrowLeft, FaWhatsapp, FaEnvelope, FaPrint, FaHeart } from 'react-icons/fa';
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
import ContacForm from '../Forms/ContactForm/ContactForm';
import { Skeleton, Dialog, DialogContent, IconButton } from '@mui/material';
import Lightbox from 'react-spring-lightbox';
import { Close as CloseIcon } from '@mui/icons-material';

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
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar Lightbox
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { suite_amount, location, photos, type, rich_description } = property;

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
    window.location = mailtoLink;
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
    speed: 1500,
    slidesToShow: 2.1,
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

  const toggleFavorite = async () => {
    try {
      const product = {
        id: property.id,
        name: property.publication_title || property.address || 'Producto sin nombre', // Usar un campo relevante para el nombre
        price: property.operations[0]?.prices[0]?.price || 0, // Precio del producto
        photos: property.photos?.[0]?.image || 'default-image.jpg' // Imagen del producto
      };
  
      if (!isFavorited) {
        // Si no está en favoritos, agregarlo
        const response = await fetch('/api/cookies/set-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product }), // Usar el producto real
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Error al guardar el producto en la cookie');
        }
      } else {
        // Si ya está en favoritos, eliminarlo
        const response = await fetch(`/api/cookies/delete-product/${product.id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el producto de la cookie');
        }
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error al manejar la cookie del producto:', error);
    }
  };
  
  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const response = await fetch('/api/cookies/get-products');
        if (!response.ok) {
          throw new Error('Error al obtener las cookies de productos');
        }
        const data = await response.json();
        const favoritedProducts = data.products || [];
        const isFav = favoritedProducts.some(prod => prod.id === property.id);
        setIsFavorited(isFav);
      } catch (error) {
        console.error('Error al obtener las cookies de productos:', error);
      }
    };
    checkIfFavorited();
  }, [property.id]);

  // Crear un array de objetos de imágenes para el lightbox
  const lightboxImages = photos.map((image, index) => ({
    src: image.image || "/path/to/default-image.jpg",
    alt: `Property Image ${index + 1}`,
    style: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
    }
  }));
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };
  return (
    <Container className="my-5 text-dark property-detail">
      {/* Botón de regreso */}
      <button onClick={goBack} variant="primary" className="btn-go-back custom-button mt-5">
        <FaArrowLeft className="me-2" />
        VOLVER A LA BUSQUEDA
      </button>

      {/* Encabezado */}
      <Row className="encabezado my-5">
        <Col className="barra" md={12}>
          <div className="nombre-precio-container">
            <div className="d-flex align-items-center">
              <h1 className="address-title-details">{address}</h1>
              <FaHeart
                className={`heart-icon ${isFavorited ? 'favorited' : ''}`}
                onClick={toggleFavorite}
              />
            </div>
            <h2 className="price-details">
              {operations[0].prices[0].currency === 'USD' ? 'Venta USD' : 'Venta ARS'}{' '}
              {operations[0].prices[0].price.toLocaleString('es-ES')}
            </h2>
          </div>
        </Col>
        <Col className="barrio-compartir-container">
          <p className="property-type-details mt">{property_type} en {barrio}</p>
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
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsOpen(true);
                  }}
                />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>

      {/* Lightbox */}
        {isOpen && (
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md">
            <DialogContent style={{ padding: 0 }}>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            {/* Botón cerrar */}
              <IconButton
                style={{ position: 'absolute', top: 0, right: 0, color: 'white' }}
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </IconButton>

              {/* Botones de navegación */}
              <IconButton
                style={{ position: 'absolute', top: '50%', left: 0, color: 'white' }}
                onClick={handlePrevImage}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                style={{ position: 'absolute', top: '50%', right: 0, color: 'white' }}
                onClick={handleNextImage}
              >
                <ArrowForwardIos />
              </IconButton>

              {/* Imagen actual */}
              <img
                src={photos[selectedImageIndex].image}
                alt={`Property Image ${selectedImageIndex}`}
                style={{ width: '100%', height: 'auto', maxHeight: '90vh' }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

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
                  <p className="letras-">{bedrooms > 1 ? 'Dormitorios' : 'Dormitorio'}</p>
                  <span className="">{bedrooms}</span>
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
          <Row className="property-info p-4 mb-5">
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
          <Row>
            {tags && tags.length > 0 && (
              <div className="property-tags bg-white p-4">
                <h2 className="mb-4">Adicionales</h2>
                <Row>
                  {tags.map((tag, index) => (
                    <Col xs={6} key={index} className="bg-white p-1 rounded mb-1">
                      {tag.name}
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Row>
        </Col>
        <Col>
          <div className="property-description bg-white p-4 rounded-3">
            <h2>Descripción</h2>
            <p className='' dangerouslySetInnerHTML={{ __html: rich_description }}></p>
          </div>
        </Col>
      </Row>

      {/* Ubicación */}
      <Row className="mt-3">
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
        <ContacForm />
      </div>
    </Container>
  );
};

export default ItemDetail;
