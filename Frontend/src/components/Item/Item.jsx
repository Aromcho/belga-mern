import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import { FaBed, FaBath, FaCarAlt, FaHeart } from "react-icons/fa";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './Item.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeartIcon } from "../Icons/Icons";

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

const Item = ({ property }) => {
  const [isMobile, setIsMobile] = useState(false);
  const mainImages = property.photos?.slice(0, 5) || [{ image: 'default-image.jpg' }];
  const price = property.operations[0]?.prices[0]?.price ? property.operations[0].prices[0].price.toLocaleString('es-ES') : 'Precio no disponible';
  const operationType = property.operations[0]?.operation_type;
  const bedrooms = property.suite_amount || 0;
  const bathrooms = property.bathroom_amount || 0;
  const parkingLots = property.parking_lot_amount || 0;
  const size = property.total_surface || 0; 
  const address = property.address || 'Dirección no disponible'; 
  const barrio = property.location.name || 'Barrio no disponible'; 
  const propertyId = property.id;
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: true, 
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define el tamaño máximo para considerar como móvil
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llama a la función una vez para establecer el estado inicial

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Card className="card-item shadow-lg  overflow-hidden text-black">
      {/* Pasar los datos de la propiedad con el estado */}
      <Link to={`/propiedad/${propertyId}`} state={{ property }} className="link-full" >{/*target={isMobile ? '_self' : '_blank'}*/}
      <div className="head-prop d-flex justify-content-between m-2 px-4 py-2">
            <span className="type-item">{operationType.toUpperCase()}</span>
            <span className="price-item">USD {price}</span>
          </div>
        <Slider {...settings} className="image-wrapper">
          {mainImages.map((img, index) => (
            <div key={index}>
              <img
                className="d-block w-100 img-rounded"
                src={img.image}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </Slider>

        <Card.Body className="py-4 ">
          <div className="card-header-item">
            <div className="direction-container">
              <h5 className="barrio-item">{barrio}</h5>
              <p className="direccion-item">{address}</p>
            </div>
            <FaHeart
      className={`heart-icon ${isFavorited ? 'favorited' : ''}`}
      onClick={toggleFavorite}
    />
          </div>
          <div className="property-info d-flex justify-content-between">
            {size > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{size.toString().slice(0, -3)}</span>
                <img className="card-icons" src='/images/icons/prop_m2.svg' />
              </div>
            )}
            {bedrooms > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{bedrooms}</span>
                <img className="card-icons" src='/images/icons/prop_cuarto.svg' />
              </div>
            )}
            {bathrooms > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{bathrooms}</span>
                <img className="card-icons" src='/images/icons/prop_ducha.svg' />
              </div>
            )}
            {parkingLots > 0 && (
              <div className="info-item d-flex flex-column">
                <span className="number-info-item">{parkingLots}</span>
                <img className="card-icons" src='/images/icons/prop_cochera.svg' />
              </div>
            )}
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Item;
