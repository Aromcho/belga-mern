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
import ImageLightbox from '../ImageLightbox/ImageLightbox';
import { HeartIcon, MailIcon, PrintIcon, WhatsappIcon } from '../Icons/Icons';
import ContacForm from '../Forms/ContactForm/ContactForm';
import Contenido from './Contenido/Contenido';


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

const ItemDetail = ({ property, planos }) => {
  const printRef = useRef();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar Lightbox
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);


  const { suite_amount, location, photos, type, rich_description } = property;
  const totalImages = photos.length;

  const videos = Array.isArray(property.videos) ? property.videos : [];
  const idTokko = property.id;
  const total_surface = property.total_surface;
  const roofed_surface = property.roofed_surface;
  const semiroofed_surface = property?.semiroofed_surface || 0;
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
  const expenses = property?.expenses || 0;
  const disposition = property?.disposition;
  const orientation = property?.orientation;
  const property_condition = property?.property_condition;
  const operationType = property.operations[0]?.operation_type;

  console.log(property);


  const navigate = useNavigate();

  const goBack = () => {
    navigate('/propertylist', { state: { fromDetail: true } });
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
    initialSlide: 0, // Posicionamiento inicial
    infinite: true,
    speed: 500,
    slidesToShow: 2.1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: false,
    autoplay: false,
    autoplaySpeed: 15000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          initialSlide: 0,
          slidesToShow: 2.1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isOpen) {
        if (event.key === 'ArrowLeft') {
          handlePrevImage();
        } else if (event.key === 'ArrowRight') {
          handleNextImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]); 


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
            {operationType}
              {operations[0].prices[0].currency === 'USD' ? ' USD' : ' $'}{' '}
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
        <Col className="p-0 m-0">
          <Slider {...sliderSettings} className="image-wrapper-detail-container">
            {videos.map((video, index) => (
              <div key={index} className="image-wrapper-detail">
                <iframe
                  src={video.player_url}
                  title={`Video ${index}`}
                  className="img-fluid mb-2 main-image"
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
                  className="img-fluid mb-2 main-image"
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

      <ImageLightbox
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  photos={photos}
  selectedImageIndex={selectedImageIndex}
  setSelectedImageIndex={setSelectedImageIndex}
/>



      {/* Detalles de la propiedad */}
      <Contenido
        age={age}
        total_surface={total_surface}
        room_amount={room_amount}
        address={address}
        bathroom_amount={bathroom_amount}
        bedrooms={bedrooms}
        parking_lot_amount={parking_lot_amount}
        toilet_amount={toilet_amount}
        expenses={expenses}
        tags={tags}
        roofed_surface={roofed_surface}
        semiroofed_surface={semiroofed_surface}
        rich_description={rich_description}
        disposition={disposition}
        orientation={orientation}
        property_condition={property_condition}
        property
        planos={planos}
      />


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
