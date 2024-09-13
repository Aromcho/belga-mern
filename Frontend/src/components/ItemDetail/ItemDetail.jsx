import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importamos los estilos del carrusel
import './ItemDetail.css';

const ItemDetail = ({ property }) => {
  const [propertyApi, setPropertyApi] = useState(null); // Estado para los detalles de la propiedad desde la API
  const [mainImage, setMainImage] = useState(null);
  const idTokko = property._id; // ID de la propiedad pasada por prop
  const type = property.type || 'Tipo de propiedad no disponible';
  console.log(type);

  // Realizamos la solicitud GET a la API pasando el ID de la propiedad
  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`/api/api/${idTokko}`);
      const propertyData = response.data;
      setPropertyApi(propertyData); // Guardamos la propiedad en el estado
      setMainImage(propertyData.photos?.[0]?.image); // Establecemos la imagen principal si hay fotos
      console.log(propertyData);
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

  return (
    <Container className="my-5 text-dark property-detail">
      {/* Carrusel de imágenes */}
      <Row className="align-items-center">
        <Col>
          <Carousel showArrows autoPlay={false} infiniteLoop dynamicHeight>
            {propertyApi.photos?.map((image, index) => (
              <div key={index}>
                <img
                  src={image.image || "/path/to/default-image.jpg"}
                  alt={`Property Image ${index}`}
                  className="img-fluid rounded-3 mb-2 main-image"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Información del inmueble */}
      <Row className="mt-5">
        <Col md={12}>
          <div className="p-4 bg-white rounded-3 shadow">
            <h1 className="display-5">{propertyApi.branch?.display_name}</h1>
            <p>{propertyApi.description}</p>
            {propertyApi.operations && propertyApi.operations[0]?.prices[0] && (
              <h2 className="text-end fw-light">
                USD {propertyApi.operations[0].prices[0].price.toFixed(2)}
              </h2>
            )}
            <p><strong>Contacto: </strong>{propertyApi.branch?.email}</p>
            <p><strong>Teléfono: </strong>{propertyApi.branch?.phone_country_code} {propertyApi.branch?.phone_area} {propertyApi.branch?.phone}</p>
            <Button as={Link} to="/properties" variant="primary" className="mt-3 w-100 custom-button">Volver a la lista</Button>
          </div>
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
    </Container>
  );
};

export default ItemDetail;
