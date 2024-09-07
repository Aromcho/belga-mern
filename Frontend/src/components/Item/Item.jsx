import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaCarAlt } from "react-icons/fa";
import './Item.css';

const Item = ({ property }) => {
  const mainImage = property.photos[0]?.image || 'default-image.jpg';
  const price = property.operations[0]?.prices[0]?.price || 'Precio no disponible';
  const operationType = property.operations[0]?.operation_type || 'Tipo de operación no disponible';
  const bedrooms = property.operations[0]?.suite_amount || 0;
  const bathrooms = property.operations[0]?.bathroom_amount || 0;
  const parkingLots = property.operations[0]?.parking_lot_amount || 0;
  const size = property.size || 0;
  const type = property.type || 'Tipo de propiedad no disponible';
  console.log(type);
  

  return (
    <Link
        className="link-item-cont text-decoration-none"
        to={`/propiedad/${property._id}`}
      >
    <Card className="card-item text-black shadow card-shadow">
        <div className="head-prop d-flex justify-content-between">
          <span>{operationType.toUpperCase()}</span>
          <span>USD {price}</span>
        </div>
        <div className="image-wrapper">
          <Card.Img
            src={mainImage}
            alt={property.description}
            className="w-100 img-rounded"
          />
        </div>
        <Card.Body>
          <Card.Title className="card-title-bold">
            {property.branch.display_name}
          </Card.Title>
          <Card.Text className="location-text">
            {property.location.address}
          </Card.Text>
          <div className="property-info">
            <div className="info-item">
              <span>{size}</span>
              <span>M2</span>
            </div>
            <div className="info-item">
              <FaBed className="icon" />
              <span>{bedrooms}</span>
            </div>
            <div className="info-item">
              <FaBath className="icon" />
              <span>{bathrooms}</span>
            </div>
            <div className="info-item">
              <FaCarAlt className="icon" />
              <span>{parkingLots}</span>
            </div>
          </div>
        </Card.Body>
    </Card>
    </Link>
  );
};

export default Item;
