import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import MapaInteractivo from '../MapaInteractivo/MapaInteractivo';
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
        display: "block",
        color: "white",
        right: 10,
        zIndex: 1,
        background: "radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)",
        borderRadius: "50%",
        boxShadow: "0 0 50px rgba(0, 0, 0, 0.4)",
        padding: 13, 
        transition: "all 0.3s ease", 
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
        display: "block",
        color: "white",
        left: 10,
        zIndex: 1,
        background: "radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)",
        borderRadius: "50%",
        boxShadow: "0 0 50px rgba(0, 0, 0, 0.4)",
        padding: 13, 
        transition: "all 0.3s ease", 
      }}
      onClick={onClick}
    />
  );
};

const ItemDetail = ({ property }) => {
  const [propertyApi, setPropertyApi] = useState(null); // Estado para los detalles de la propiedad desde la API
  const [mainImage, setMainImage] = useState(null);
  const idTokko = property._id; // ID de la propiedad pasada por prop
  const type = property.type || 'Tipo de propiedad no disponible';
  
  // Realizamos la solicitud GET a la API pasando el ID de la propiedad
  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`/api/api/${idTokko}`);
      const propertyData = response.data;
      setPropertyApi(propertyData); // Guardamos la propiedad en el estado
      setMainImage(propertyData.photos?.[0]?.image); // Establecemos la imagen principal si hay fotos
    } catch (error) {
      console.error('Error al obtener los detalles de la propiedad:', error);
    }
  };

  // Usamos useEffect para ejecutar la solicitud una vez que el componente se monta
  useEffect(() => {
    fetchPropertyDetails();
  }, [idTokko]);

  // Si no hay datos de la propiedad, mostramos un mensaje de carga
  if (!propertyApi) {
    return <div>Loading...</div>;
  }

  // Configuración del slider con las flechas personalizadas
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />, // Usando la flecha personalizada de Next
    prevArrow: <PrevArrow />, // Usando la flecha personalizada de Prev
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container className="my-5 text-dark property-detail">
      {/* Información del inmueble */}
      <Row className="mt-5">
        <Col md={12}>
          <div className="p-4 bg-white rounded-3 shadow">
            <Button as={Link} to="/propertylist" variant="primary" className="mt-3 w-100 custom-button">Volver a la lista</Button>
            <h1 className="display-5">{propertyApi.branch?.address}</h1>
            {propertyApi.operations && propertyApi.operations[0]?.prices[0] && (
              <h2 className="text-end fw-light">
                USD {propertyApi.operations[0].prices[0].price.toFixed(2)}
              </h2>
            )}
          </div>
        </Col>
      </Row>
      
      {/* Carrusel de imágenes con React Slick y flechas personalizadas */}
      <Row className="align-items-center">
        <Col>
          <Slider {...sliderSettings} className='image-wrapper-detail'>
            {propertyApi.photos?.map((image, index) => (
              <div key={index} className='image-wrapper-detail'>
                <img
                  src={image.image || "/path/to/default-image.jpg"}
                  alt={`Property Image ${index}`}
                  className="img-fluid rounded-3 mb-2 main-image"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>

      {/* Sección de características */}
      <Row className="mt-5">
        <Col md={6}>
          <div className="property-features bg-white p-4 rounded-3 shadow">
            <h2>Superficies</h2>
            <p><strong>Sup. Cubierta: </strong>{propertyApi.roofed_surface} M2</p>
            <p><strong>Sup. Total: </strong>{propertyApi.total_surface} M2</p>
            <p><strong>Ambientes: </strong>{propertyApi.room_amount}</p>
          </div>
        </Col>
        <Col md={6}>
          <div className="property-info bg-white p-4 rounded-3 shadow">
            <h2>Información</h2>
            <p><strong>Disposición: </strong>{propertyApi.disposition}</p>
            <p><strong>Orientación: </strong>{propertyApi.orientation}</p>
            <p><strong>Condición: </strong>{propertyApi.property_condition}</p>
          </div>
        </Col>
      </Row>

      {/* Descripción */}
      <Row className="mt-5">
        <Col>
          <div className="property-description bg-white p-4 rounded-3 shadow">
            <h2>Descripción</h2>
            <p>{propertyApi.rich_description}</p>
          </div>
        </Col>
      </Row>

      {/* Mapa interactivo */}
      <Row className="mt-5">
        <Col>
          <div className="map-container bg-white p-4 rounded-3 shadow">
            <h2>Ubicación</h2>
            <MapaInteractivo property={property} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetail;
