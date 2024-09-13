import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SliderCardGallery from '../SliderCardGallery/SliderCardGallery';
import {HeartIcon} from '../Icons/Icons'; // Ajusta la ruta según la ubicación de tu componente
import {ImageIcon} from '../Icons/Icons'; // Ajusta la ruta según la ubicación de tu componente
import { formatToMoney, classes } from '../../helpers/index.js'; // Ajusta la ruta según la ubicación de tus helpers
import './CardProp.css'; // Importa el archivo CSS común

const CardProp = ({ className, liked = false, onLiked, inversion = false, property }) => {
  const link = inversion ? `/emprendimientos/${property.id}` : `/propiedad/${property.id}`;
  const media = property.photos.slice(0, 10).map((photo) => photo.image);
  
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const handleLike = (e) => {
    e.stopPropagation();
    if (onLiked) onLiked();
  };

  return (
    <Link to={link}>
      <div className={classes('card-prop-container', className, { inversion })}>
        <div className="head-prop">
          {!inversion && <div className="operation">{property.operations[0]?.operation_type}</div>}
          {!inversion && (
            <div className="price">
              {inversion && 'Desde'}
              <span className="currency">{property.operations[0]?.prices[0].currency}</span>
              {formatToMoney(property.operations[0].prices[0].price)}
            </div>
          )}
        </div>

        <div className="image-wrapper">
          {inversion ? (
            <div
              className="isolated-image"
              style={{ backgroundImage: `url(${property.photos[0]?.image})` }}
            />
          ) : media.length > 0 ? (
            <SliderCardGallery img={media} galleryLink={link} />
          ) : (
            <div className="empty-media">
              <ImageIcon />
              <span className="empty-text">Sin material multimedia</span>
            </div>
          )}
        </div>

        <div className="footer-prop">
          <div className="info">
            <div className="desc-wrapper">
              <div className="desc">{inversion ? property.fake_address : property.location?.name}</div>
              <div className="address">{inversion ? property.location?.name : property.address}</div>
            </div>
            {!inversion && (
              <div className={classes('like-wrapper', { liked: isLiked })} onClick={handleLike}>
                <HeartIcon className="icon-heart" />
              </div>
            )}
          </div>

          {!inversion && (
            <div className="features-wrapper">
              <ul className="features-list">
                {Math.round(property.total_surface) > 0 && (
                  <li className="features-item">
                    <div className="feature-text">{Math.round(property.total_surface)}</div>
                    <img className="feature-img" src="/images/icons/prop_m2.svg" alt="m2" />
                  </li>
                )}
                {property.suite_amount > 0 && (
                  <li className="features-item">
                    <div className="feature-text">{property.suite_amount}</div>
                    <img className="feature-img" src="/images/icons/prop_cuarto.svg" alt="suite" />
                  </li>
                )}
                {property.bathroom_amount > 0 && (
                  <li className="features-item">
                    <div className="feature-text">{property.bathroom_amount}</div>
                    <img className="feature-img" src="/images/icons/prop_ducha.svg" alt="bathroom" />
                  </li>
                )}
                {property.parking_lot_amount > 0 && (
                  <li className="features-item">
                    <div className="feature-text">{property.parking_lot_amount}</div>
                    <img className="feature-img" src="/images/icons/prop_cochera.svg" alt="parking lot" />
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProp;
